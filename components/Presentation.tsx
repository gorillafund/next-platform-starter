import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Download } from "lucide-react";
import { slides, presentationConfig } from "../presentationContent";
import { Slide } from "./Slide";
import { Button } from "./ui/button";
import { AnimatedBackground } from "./AnimatedBackground";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };



  const exportToPDF = async () => {
    if (!slideContainerRef.current || isExporting) return;
    
    setIsExporting(true);
    const originalSlide = currentSlide;

    try {
      // Create PDF in landscape orientation (16:9 aspect ratio)
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1920, 1080], // 16:9 format
      });

      // Export each slide
      for (let i = 0; i < slides.length; i++) {
        // Navigate to the slide
        setCurrentSlide(i);
        
        // Wait for the slide to render
        await new Promise(resolve => setTimeout(resolve, 800));

        // Get all images and ensure they're loaded
        const images = slideContainerRef.current.querySelectorAll('img');
        
        // Wait for all images to load completely
        await Promise.all(
          Array.from(images).map((img) => {
            if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
            return new Promise((resolve) => {
              const timeout = setTimeout(() => {
                console.warn('Image load timeout:', img.src);
                resolve(null);
              }, 3000);
              
              img.onload = () => {
                clearTimeout(timeout);
                resolve(null);
              };
              img.onerror = () => {
                clearTimeout(timeout);
                console.warn('Image load error:', img.src);
                resolve(null);
              };
            });
          })
        );

        // Additional wait for images to settle
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log(`Rendering slide ${i + 1} with ${images.length} images`);
        // Capture the slide
        const canvas = await html2canvas(slideContainerRef.current, {
          scale: 2,
          backgroundColor: "#fafafc",
          logging: true,
          useCORS: false,
          allowTaint: true,
          imageTimeout: 15000,
          width: slideContainerRef.current.offsetWidth,
          height: slideContainerRef.current.offsetHeight,
          windowWidth: slideContainerRef.current.offsetWidth,
          windowHeight: slideContainerRef.current.offsetHeight,
          onclone: (clonedDoc) => {
            // Replace oklch() colors in all style tags and inline styles
            const replaceOklch = (text: string): string => {
              return text
                .replace(/oklch\(0\.145\s+0\s+0\)/gi, '#252525')
                .replace(/oklch\(0\.985\s+0\s+0\)/gi, '#fafafa')
                .replace(/oklch\(1\s+0\s+0\)/gi, '#ffffff')
                .replace(/oklch\(0\.95\s+[^)]+\)/gi, '#f5f5fa')
                .replace(/oklch\(0\.708\s+0\s+0\)/gi, '#b3b3b3')
                .replace(/oklch\(0\.97\s+0\s+0\)/gi, '#f5f5f5')
                .replace(/oklch\(0\.205\s+0\s+0\)/gi, '#333333')
                .replace(/oklch\(0\.922\s+0\s+0\)/gi, '#ebebeb')
                .replace(/oklch\(0\.269\s+0\s+0\)/gi, '#444444')
                .replace(/oklch\(0\.439\s+0\s+0\)/gi, '#707070')
                .replace(/oklch\([^)]+\)/gi, '#252525');
            };

            // Fix all style tags
            const styles = clonedDoc.querySelectorAll('style');
            styles.forEach((style) => {
              if (style.textContent) {
                style.textContent = replaceOklch(style.textContent);
              }
            });

            // Fix all inline styles
            const allElements = clonedDoc.querySelectorAll('[style]');
            allElements.forEach((el) => {
              const element = el as HTMLElement;
              const styleAttr = element.getAttribute('style');
              if (styleAttr) {
                element.setAttribute('style', replaceOklch(styleAttr));
              }
            });

            // Remove crossOrigin attributes from all images to allow tainted canvas
            const clonedImages = clonedDoc.querySelectorAll('img');
            clonedImages.forEach((clonedImg) => {
              clonedImg.removeAttribute('crossorigin');
              clonedImg.removeAttribute('srcset');
              console.log('Processing image:', clonedImg.src.substring(0, 80));
            });
          },
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        
        // Add page if not first slide
        if (i > 0) {
          pdf.addPage([1920, 1080]);
        }

        // Calculate dimensions to maintain aspect ratio
        const canvasAspect = canvas.width / canvas.height;
        const pageAspect = 1920 / 1080;
        
        let width = 1920;
        let height = 1080;
        let x = 0;
        let y = 0;

        if (canvasAspect > pageAspect) {
          // Canvas is wider than page
          height = width / canvasAspect;
          y = (1080 - height) / 2;
        } else {
          // Canvas is taller than page
          width = height * canvasAspect;
          x = (1920 - width) / 2;
        }

        // Add image to PDF with proper dimensions
        pdf.addImage(imgData, "JPEG", x, y, width, height);
      }

      // Download the PDF
      pdf.save("Valuya-Presentation.pdf");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert(`Failed to export PDF: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    } finally {
      // Restore original slide
      setCurrentSlide(originalSlide);
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "f" || e.key === "F") toggleFullscreen();
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [currentSlide, isFullscreen]);

  return (
    <div className="relative size-full bg-gradient-to-br from-[#fafafc] via-[#f5f5fa] to-[#fafafc] overflow-hidden">
      {/* Animated background - hidden during export */}
      {!isExporting && <AnimatedBackground />}

      {/* Main slide container - fullscreen */}
      <div ref={slideContainerRef} className="relative size-full">
        <Slide 
          slide={slides[currentSlide]} 
          config={presentationConfig}
          onNext={!isExporting && currentSlide < slides.length - 1 ? nextSlide : undefined}
          onPrev={!isExporting && currentSlide > 0 ? prevSlide : undefined}
        />
      </div>

      {/* Bottom controls */}
      {!isExporting && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-4 z-50">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            size="icon"
            className="size-9 md:size-10 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="size-4 md:size-5" />
          </Button>

          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg">
            <span className="text-sm md:text-base font-medium text-[#0016df]">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            variant="outline"
            size="icon"
            className="size-9 md:size-10 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight className="size-4 md:size-5" />
          </Button>
        </div>
      )}

      {/* Slide indicator dots */}
      {!isExporting && (
        <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-50">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`size-1.5 md:size-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-[#0016df] w-6 md:w-8"
                  : "bg-[#0016df]/30 hover:bg-[#0016df]/50 active:bg-[#0016df]/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Top right controls */}
      {!isExporting && (
        <div className="absolute top-3 right-3 md:top-8 md:right-8 flex items-center gap-2 md:gap-3 z-50">
          <div className="hidden md:block text-xs text-[#717182] bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
            Use ← → or F for fullscreen
          </div>
          <Button
            onClick={exportToPDF}
            variant="outline"
            size="icon"
            className="size-9 md:size-10 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 active:scale-95"
            title="Export to PDF"
          >
            <Download className="size-3.5 md:size-4" />
          </Button>
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="icon"
            className="size-9 md:size-10 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 active:scale-95"
          >
            {isFullscreen ? <Minimize2 className="size-3.5 md:size-4" /> : <Maximize2 className="size-3.5 md:size-4" />}
          </Button>
        </div>
      )}

      {/* Export progress indicator */}
      {isExporting && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-4">
            <div className="size-12 border-4 border-[#0016df] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-[#1a1a66] text-xl">Exporting presentation...</p>
            <p className="text-[#717182]">
              Slide {currentSlide + 1} of {slides.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
