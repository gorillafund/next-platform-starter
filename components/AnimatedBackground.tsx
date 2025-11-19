'use client';

import { motion } from 'motion/react';
import clsx from 'clsx';

interface AnimatedBackgroundProps {
    className?: string;
}

export function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
    return (
        <div className={clsx('absolute inset-0 overflow-hidden pointer-events-none', className)}>
            {/* ORB 1 */}
            <motion.div
                initial={false}
                className="absolute w-[500px] h-[500px] rounded-full blur-[120px]"
                style={{
                    background:
                        'radial-gradient(circle, rgba(0,22,223,0.18) 0%, rgba(0,22,223,0.06) 50%, transparent 100%)'
                }}
                animate={{
                    x: ['10%', '60%', '30%', '70%', '10%'],
                    y: ['20%', '60%', '40%', '10%', '20%'],
                    scale: [1, 1.2, 0.9, 1.15, 1],
                    opacity: [0.35, 0.55, 0.3, 0.45, 0.35]
                }}
                transition={{
                    duration: 42,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            {/* ORB 2 */}
            <motion.div
                initial={false}
                className="absolute w-[600px] h-[600px] rounded-full blur-[140px]"
                style={{
                    background:
                        'radial-gradient(circle, rgba(26,26,102,0.15) 0%, rgba(0,22,223,0.08) 50%, transparent 100%)'
                }}
                animate={{
                    x: ['70%', '20%', '60%', '25%', '70%'],
                    y: ['70%', '30%', '65%', '45%', '70%'],
                    scale: [1, 1.25, 1.1, 0.9, 1],
                    opacity: [0.28, 0.5, 0.38, 0.6, 0.28]
                }}
                transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            {/* ORB 3 */}
            <motion.div
                initial={false}
                className="absolute w-[450px] h-[450px] rounded-full blur-[100px]"
                style={{
                    background:
                        'radial-gradient(circle, rgba(0,22,223,0.13) 0%, rgba(100,100,200,0.06) 50%, transparent 100%)'
                }}
                animate={{
                    x: ['40%', '80%', '50%', '15%', '40%'],
                    y: ['50%', '15%', '75%', '35%', '50%'],
                    scale: [1, 0.85, 1.3, 1.05, 1],
                    opacity: [0.3, 0.5, 0.35, 0.45, 0.3]
                }}
                transition={{
                    duration: 36,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            {/* ORB 4 */}
            <motion.div
                initial={false}
                className="absolute w-[550px] h-[550px] rounded-full blur-[130px]"
                style={{
                    background:
                        'radial-gradient(circle, rgba(0,100,223,0.11) 0%, rgba(26,26,102,0.05) 50%, transparent 100%)'
                }}
                animate={{
                    x: ['25%', '55%', '75%', '35%', '25%'],
                    y: ['80%', '25%', '55%', '70%', '80%'],
                    scale: [1, 1.15, 0.9, 1.25, 1],
                    opacity: [0.3, 0.4, 0.5, 0.35, 0.3]
                }}
                transition={{
                    duration: 58,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            {/* Small Orb */}
            <motion.div
                initial={false}
                className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
                style={{
                    background: 'radial-gradient(circle, rgba(0,22,223,0.15) 0%, transparent 70%)'
                }}
                animate={{
                    x: ['15%', '75%', '35%', '15%'],
                    y: ['35%', '70%', '25%', '35%'],
                    scale: [1, 1.15, 0.85, 1],
                    opacity: [0.25, 0.35, 0.3, 0.25]
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            {/* Grid overlay */}
            <div
                className="
                    absolute inset-0 
                    bg-[linear-gradient(rgba(0,22,223,0.02)_1px,transparent_1px),
                    linear-gradient(90deg,rgba(0,22,223,0.02)_1px,transparent_1px)]
                    bg-[size:100px_100px]
                    [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]
                "
            />
        </div>
    );
}
