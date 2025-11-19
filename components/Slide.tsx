import { SlideContent } from "../presentationContent";
import { Logo } from "./Logo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import imgPortrait6 from "../imports/Frame321";
import imgPortraitSascha1 from "figma:asset/b6d099453bfc2dcd02078dc01ea80ff48edf6940.png";
import imgPortraitJakob1 from "figma:asset/9003f795bb58899039e20b46f96130ceb20860a0.png";
import imgPortraitTobias1 from "figma:asset/e9c90bffd7493312b79287830a4862186dc8ae25.png";
import imgPortraitValentin1 from "figma:asset/e24101ccdd8bf8e7a78e286110cf1ee990715302.png";
import imgPortraitSascha2 from "figma:asset/5992f738ed09dc6e6ffbd16f7c0fa4d6d74ea8de.png";
import imgPortraitJakob2 from "figma:asset/9581ebbf40256334d8160dd5a29d914cc7406ae5.png";
import imgPortraitTobias2 from "figma:asset/05315b7f34e96547497a0fbb962caeb51ce29ca2.png";
import imgPortraitAymie1 from "figma:asset/210901fdfb0116257acee4efdf07f54e668d7180.png";
import imgPortraitValentin2 from "figma:asset/08ee85e2ff0c22cb5acd2c2e18677b633151671e.png";
import { motion } from "motion/react";

interface SlideProps {
  slide: SlideContent;
  config: any;
  onNext?: () => void;
  onPrev?: () => void;
}

const imageMap: Record<string, string> = {
  imgPortraitSascha1,
  imgPortraitJakob1,
  imgPortraitTobias1,
  imgPortraitValentin1,
  imgPortraitSascha2,
  imgPortraitJakob2,
  imgPortraitTobias2,
  imgPortraitAymie1,
  imgPortraitValentin2,
};

export function Slide({ slide, config, onNext, onPrev }: SlideProps) {
  return (
    <motion.div 
      className="relative size-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      key={slide.id}
    >
      {/* Background image if specified */}
      {slide.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={slide.backgroundImage}
            alt=""
            className="size-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#fafafc]/95 to-[#fafafc]/90" />
        </div>
      )}

      {/* Logo - top left (hidden on cover slide) */}
      {slide.type !== "cover" && (
        <div className="absolute left-4 top-4 h-6 z-10 sm:left-4 sm:top-4 sm:h-8 md:left-6 md:top-6 md:h-10 lg:left-8 lg:top-8 lg:h-12">
          <Logo className="h-full" />
        </div>
      )}

      {/* On-slide navigation buttons */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-50 size-10 md:size-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-5 md:size-6 text-[#0016df] group-hover:text-[#0016df]" />
        </button>
      )}

      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-50 size-10 md:size-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
          aria-label="Next slide"
        >
          <ChevronRight className="size-5 md:size-6 text-[#0016df] group-hover:text-[#0016df]" />
        </button>
      )}

      {/* Content based on slide type - responsive margins: 8% on mobile, 20% on desktop */}
      <div className={`absolute inset-[8%] md:inset-[20%] flex ${slide.type === "cover" || slide.type === "conclusion" ? "items-center justify-center" : "items-start justify-start"}`}>
        {slide.type === "cover" && <CoverSlide slide={slide} />}
        {slide.type === "text" && <TextSlide slide={slide} />}
        {slide.type === "visual" && <VisualSlide slide={slide} />}
        {slide.type === "team" && <TeamSlide slide={slide} />}
        {slide.type === "conclusion" && <ConclusionSlide config={config} />}
      </div>
    </motion.div>
  );
}

function CoverSlide({ slide }: { slide: SlideContent }) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="h-18 sm:h-24 md:h-30 lg:h-36 xl:h-42">
        <Logo className="h-full" />
      </div>
    </div>
  );
}

function TextSlide({ slide }: { slide: SlideContent }) {
  const hasImage = slide.image && slide.imagePosition !== "background";
  const imageOnRight = slide.imagePosition === "right";
  const imageOnLeft = slide.imagePosition === "left";
  const imageCenter = slide.imagePosition === "center";

  if (imageCenter) {
    return (
      <div className="w-full h-full flex flex-col justify-start space-y-6 md:space-y-8 lg:space-y-10">
        <h2 className="text-[#0016df] mb-6 md:mb-8 text-2xl sm:text-3xl md:text-5xl lg:text-6xl">{slide.title}</h2>
        
        {slide.image && (
          <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="space-y-4 md:space-y-6">
          {Array.isArray(slide.content) ? (
            slide.content.map((paragraph, idx) => (
              <p key={idx} className="text-[#1a1a66] text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                {paragraph}
              </p>
            ))
          ) : (
            slide.content && (
              <p className="text-[#1a1a66] text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                {slide.content}
              </p>
            )
          )}
        </div>

        {slide.bullets && slide.bullets.length > 0 && (
          <ul className="space-y-3 md:space-y-4 list-disc list-inside ml-5 md:ml-6 text-base sm:text-lg md:text-2xl lg:text-3xl">
            {slide.bullets.map((bullet, idx) => {
              const isObject = typeof bullet === 'object';
              const text = isObject ? bullet.text : bullet;
              const url = isObject ? bullet.url : undefined;
              
              return (
                <li key={idx} className="text-[#1a1a66] leading-relaxed">
                  {url ? (
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#0016df] hover:underline cursor-pointer transition-colors hover:text-[#0012b0]"
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  if (hasImage && (imageOnRight || imageOnLeft)) {
    return (
      <div className={`w-full h-full flex flex-col justify-start lg:flex-row lg:items-start gap-6 md:gap-10 lg:gap-16 ${imageOnLeft ? 'lg:flex-row-reverse' : ''}`}>
        <div className="flex-1 space-y-4 md:space-y-6 lg:space-y-8">
          <h2 className="text-[#0016df] mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl md:text-5xl lg:text-6xl">{slide.title}</h2>
          
          {Array.isArray(slide.content) ? (
            <div className="space-y-4 md:space-y-6">
              {slide.content.map((paragraph, idx) => (
                <p key={idx} className="text-[#1a1a66] text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            slide.content && (
              <p className="text-[#1a1a66] text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                {slide.content}
              </p>
            )
          )}

          {slide.bullets && slide.bullets.length > 0 && (
            <ul className="space-y-3 md:space-y-4 list-disc list-inside ml-5 md:ml-6 text-base sm:text-lg md:text-2xl lg:text-3xl">
              {slide.bullets.map((bullet, idx) => {
                const isObject = typeof bullet === 'object';
                const text = isObject ? bullet.text : bullet;
                const url = isObject ? bullet.url : undefined;
                
                return (
                  <li key={idx} className="text-[#1a1a66] leading-relaxed">
                    {url ? (
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#0016df] hover:underline cursor-pointer transition-colors hover:text-[#0012b0]"
                      >
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex-1 w-full">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-start space-y-6 md:space-y-8 lg:space-y-10">
      <h2 className="text-[#0016df] mb-6 md:mb-8 text-2xl sm:text-3xl md:text-5xl lg:text-6xl">{slide.title}</h2>
      
      {Array.isArray(slide.content) ? (
        <div className="space-y-4 md:space-y-6">
          {slide.content.map((paragraph, idx) => (
            <p key={idx} className="text-[#1a1a66] text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        slide.content && (
          <p className="text-[#1a1a66] text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
            {slide.content}
          </p>
        )
      )}

      {slide.bullets && slide.bullets.length > 0 && (
        <ul className="space-y-3 md:space-y-4 list-disc list-inside ml-5 md:ml-6 text-base sm:text-lg md:text-2xl lg:text-3xl">
          {slide.bullets.map((bullet, idx) => {
            const isObject = typeof bullet === 'object';
            const text = isObject ? bullet.text : bullet;
            const url = isObject ? bullet.url : undefined;
            
            return (
              <li key={idx} className="text-[#1a1a66] leading-relaxed">
                {url ? (
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#0016df] hover:underline cursor-pointer transition-colors hover:text-[#0012b0]"
                  >
                    {text}
                  </a>
                ) : (
                  text
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function VisualSlide({ slide }: { slide: SlideContent }) {
  return (
    <div className="w-full h-full flex flex-col justify-start gap-4 md:gap-6">
      <h2 className="text-[#0016df] text-2xl sm:text-3xl md:text-5xl lg:text-6xl flex-shrink-0">{slide.title}</h2>
      
      {slide.image && (
        <div className="flex-1 w-full flex items-center justify-center min-h-0">
          <div className="max-w-6xl max-h-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
            <img
              src={slide.image}
              alt={slide.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
      
      <p className="text-[#1a1a66] text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed flex-shrink-0" style={{ whiteSpace: 'pre-line' }}>
        {slide.content}
      </p>
    </div>
  );
}

function TeamSlide({ slide }: { slide: SlideContent }) {
  // Check if this is a logos slide (no names) or a team members slide
  const isLogosSlide = slide.teamMembers?.every(member => !member.name);

  return (
    <div className="w-full h-full flex flex-col justify-start space-y-8 md:space-y-10 lg:space-y-14">
      <h2 className="text-[#0016df] text-2xl sm:text-3xl md:text-5xl lg:text-6xl">{slide.title}</h2>
      
      {slide.content && (
        <p className="text-[#1a1a66] text-base sm:text-lg md:text-2xl lg:text-3xl">{slide.content}</p>
      )}

      <div className="flex flex-wrap gap-8 sm:gap-10 md:gap-14 lg:gap-16 items-center justify-center">
        {slide.teamMembers?.map((member, idx) => {
          // Check if image is a URL or an imageMap reference
          const imageSrc = member.image.startsWith('http') 
            ? member.image 
            : imageMap[member.image];
          
          return (
            <div key={idx} className="flex flex-col items-center space-y-4">
              {isLogosSlide ? (
                // Logo display - square/rectangular with object-contain
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 bg-white rounded-2xl overflow-hidden border-2 border-[#e9ebef] shadow-xl p-3 sm:p-4 md:p-6 flex items-center justify-center">
                  <img
                    src={imageSrc}
                    alt={member.name || "Partner logo"}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                // Team member display - circular with object-cover
                <div className="size-20 sm:size-24 md:size-32 lg:size-40 xl:size-44 rounded-full overflow-hidden border-4 border-[#1a1a66] shadow-xl">
                  <img
                    src={imageSrc}
                    alt={member.name}
                    className="size-full object-cover"
                  />
                </div>
              )}
              {member.name && (
                <div className="text-center">
                  <p className="text-[#1a1a66] text-base sm:text-lg md:text-2xl lg:text-3xl">{member.name}</p>
                  <p className="text-[#717182] text-sm sm:text-base md:text-xl lg:text-2xl">{member.role}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConclusionSlide({ config }: { config: any }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-10 md:space-y-12">
      <div className="h-18 sm:h-24 md:h-30 lg:h-36 xl:h-42">
        <Logo className="h-full" />
      </div>
      <div className="space-y-8 md:space-y-8 text-center">
        <div>
          <h2 className="text-[#0016df] text-2xl sm:text-3xl md:text-5xl lg:text-6xl">{config.company.name}</h2>
          <p className="text-[#717182] text-xs sm:text-sm md:text-lg lg:text-xl mt-3 md:mt-3 opacity-70">
            Valuya is a Joint Venture by Gorilla Funds UG and 31third.b.V
          </p>
        </div>
        <div className="text-[#1a1a66] space-y-3 md:space-y-4 text-base sm:text-lg md:text-3xl lg:text-4xl">
          <p>{config.company.address}</p>
          <p>{config.company.city}</p>
          <div className="mt-8 md:mt-10 space-y-2 md:space-y-2">
            <p className="text-lg sm:text-xl md:text-4xl lg:text-5xl">{config.company.email}</p>
            <p className="text-lg sm:text-xl md:text-4xl lg:text-5xl">manuel@valuya.net</p>
          </div>
        </div>
      </div>
    </div>
  );
}
