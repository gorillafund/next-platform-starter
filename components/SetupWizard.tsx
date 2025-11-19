'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Progress } from './ui/progress';
import { AnimatedBackground } from './AnimatedBackground';
import { Logo } from './Logo';
import { ChevronLeft, ChevronRight, Check, ArrowRight } from 'lucide-react';
import { setupQuestions, categories, type Question } from '../setupQuestions';
import { cn } from './ui/utils';

interface FormData {
    [key: string]: string | string[];
}

export function SetupWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({});
    const [isComplete, setIsComplete] = useState(false);
    const [direction, setDirection] = useState(1);

    const currentQuestion = setupQuestions[currentStep];
    const progress = ((currentStep + 1) / setupQuestions.length) * 100;

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !e.shiftKey && currentStep < setupQuestions.length) {
                e.preventDefault();
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentStep, formData]);

    const handleNext = () => {
        if (currentStep < setupQuestions.length - 1) {
            setDirection(1);
            setCurrentStep(currentStep + 1);
        } else if (currentStep === setupQuestions.length - 1) {
            setDirection(1);
            setIsComplete(true);
        }
    };

    const handleBack = () => {
        if (isComplete) {
            setDirection(-1);
            setIsComplete(false);
        } else if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (value: string | string[]) => {
        setFormData({
            ...formData,
            [currentQuestion.id]: value
        });
    };

    const handleMultiSelectChange = (option: string) => {
        const currentValues = (formData[currentQuestion.id] as string[]) || [];
        const newValues = currentValues.includes(option)
            ? currentValues.filter((v) => v !== option)
            : [...currentValues, option];
        handleInputChange(newValues);
    };

    const isCurrentStepValid = () => {
        if (!currentQuestion?.required) return true;
        const value = formData[currentQuestion.id];
        if (!value) return false;
        if (Array.isArray(value)) return value.length > 0;
        return value.toString().trim().length > 0;
    };

    const canProceed = isCurrentStepValid();

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const renderQuestionInput = () => {
        const value = formData[currentQuestion.id];

        switch (currentQuestion.type) {
            case 'text':
                return (
                    <Input
                        type="text"
                        value={(value as string) || ''}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={currentQuestion.placeholder}
                        className="w-full max-w-xl text-xl h-14 bg-white/90 backdrop-blur-sm border-2 border-primary/20 focus:border-primary transition-colors"
                        autoFocus
                    />
                );

            case 'textarea':
                return (
                    <Textarea
                        value={(value as string) || ''}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={currentQuestion.placeholder}
                        className="w-full max-w-xl min-h-32 text-xl bg-white/90 backdrop-blur-sm border-2 border-primary/20 focus:border-primary transition-colors resize-none"
                        autoFocus
                    />
                );

            case 'select':
                return (
                    <Select value={(value as string) || ''} onValueChange={handleInputChange}>
                        <SelectTrigger className="w-full max-w-xl h-14 text-xl bg-white/90 backdrop-blur-sm border-2 border-primary/20 focus:border-primary transition-colors">
                            <SelectValue placeholder="Select an option..." />
                        </SelectTrigger>
                        <SelectContent className="max-w-xl">
                            {currentQuestion.options?.map((option) => (
                                <SelectItem key={option} value={option} className="text-lg py-3">
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );

            case 'radio':
                return (
                    <RadioGroup
                        value={(value as string) || ''}
                        onValueChange={handleInputChange}
                        className="space-y-3 w-full max-w-xl"
                    >
                        {currentQuestion.options?.map((option) => (
                            <motion.div
                                key={option}
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-start space-x-3 p-4 rounded-lg bg-white/90 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                            >
                                <RadioGroupItem value={option} id={option} className="mt-1" />
                                <Label htmlFor={option} className="flex-1 cursor-pointer text-lg">
                                    {option}
                                </Label>
                            </motion.div>
                        ))}
                    </RadioGroup>
                );

            case 'multi-select': {
                const selectedValues = (value as string[]) || [];

                return (
                    <div className="space-y-3 w-full max-w-xl">
                        {currentQuestion.options?.map((option) => {
                            const isSelected = selectedValues.includes(option);

                            return (
                                <motion.div
                                    key={option}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleMultiSelectChange(option)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleMultiSelectChange(option);
                                        }
                                    }}
                                    className={`flex w-full items-start space-x-3 p-4 rounded-lg backdrop-blur-sm border-2 transition-all text-left ${
                                        isSelected
                                            ? 'bg-primary/10 border-primary'
                                            : 'bg-white/90 border-primary/20 hover:border-primary/40'
                                    }`}
                                >
                                    <Checkbox checked={isSelected} className="mt-1" />
                                    <span className="flex-1 text-lg">{option}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                );
            }

            default:
                return null;
        }
    };

    if (isComplete) {
        return (
            <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 max-w-4xl mx-auto px-8 py-12 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-24 h-24 mx-auto mb-8 bg-green-500 rounded-full flex items-center justify-center"
                    >
                        <Check className="w-12 h-12 text-white" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Logo className="mx-auto mb-8" />

                        <h1 className="text-5xl mb-4">Setup Complete!</h1>
                        <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                            You've configured your investment platform with Valuya. The Investment Platform is being
                            generated. You will receive an E-Mail with Access to the Admin Dashboard within the next
                            five Minutes.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl mb-6">Your Configuration Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            {categories.map((category) => {
                                const categoryQuestions = setupQuestions.filter((q) => q.category === category);
                                const answeredCount = categoryQuestions.filter((q) => formData[q.id]).length;

                                return (
                                    <div key={category} className="p-4 bg-primary/5 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg">{category}</h3>
                                            <span className="text-sm text-muted-foreground">
                                                {answeredCount}/{categoryQuestions.length}
                                            </span>
                                        </div>
                                        <Progress
                                            value={(answeredCount / categoryQuestions.length) * 100}
                                            className="h-2"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex gap-4 justify-center"
                    >
                        <Button onClick={handleBack} variant="outline" size="lg" className="text-lg h-14 px-8">
                            <ChevronLeft className="mr-2 h-5 w-5" />
                            Review Answers
                        </Button>
                        <Button size="lg" className="text-lg h-14 px-8" onClick={() => window.location.reload()}>
                            Start New Setup
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <AnimatedBackground />

            {/* Header with Progress */}
            <div className="relative z-10 w-full">
                <div className="max-w-4xl mx-auto px-8 pt-8 pb-4">
                    <Logo className="mb-6 h-10" />
                    <div className="mb-3">
                        <div className="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
                            <div
                                className="h-full transition-all duration-500 ease-out rounded-full"
                                style={{
                                    width: `${progress}%`,
                                    backgroundColor: '#0016DF'
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{currentQuestion.category}</p>
                        <span className="text-sm text-muted-foreground">
                            Question {currentStep + 1} of {setupQuestions.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-8 pb-16 pt-8">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentStep}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="w-full max-w-3xl mx-auto"
                    >
                        <div className="mb-10">
                            <h1 className="text-3xl md:text-4xl mb-4 leading-tight">{currentQuestion.title}</h1>
                            {currentQuestion.description && (
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {currentQuestion.description}
                                </p>
                            )}
                        </div>

                        <div className="mb-12">{renderQuestionInput()}</div>

                        {/* Validation Message */}
                        {!canProceed && currentQuestion.required && (
                            <div className="text-center mb-4">
                                <span className="text-sm text-muted-foreground">Please answer to continue</span>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
                            <Button
                                onClick={handleBack}
                                variant="outline"
                                size="lg"
                                disabled={currentStep === 0}
                                className="text-lg h-14 px-8 w-full sm:w-auto"
                            >
                                <ChevronLeft className="mr-2 h-5 w-5" />
                                Back
                            </Button>

                            <Button
                                onClick={handleNext}
                                disabled={!canProceed}
                                size="lg"
                                className="text-lg h-14 px-8 w-full sm:w-auto"
                            >
                                {currentStep === setupQuestions.length - 1 ? 'Complete Setup' : 'Continue'}
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>

                        <p className="text-sm text-muted-foreground text-center mt-8">
                            Press <kbd className="px-2 py-1 bg-white/80 rounded border border-primary/20">Enter</kbd> to
                            continue
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
