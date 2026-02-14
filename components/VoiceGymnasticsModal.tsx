import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, RefreshCw, Check } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function VoiceGymnasticsModal() {
    const { isVoiceModalOpen, closeVoiceModal, currentQuote, setRandomQuote } = useStore();

    return (
        <AnimatePresence>
            {isVoiceModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeVoiceModal}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white rounded-pro-card p-8 shadow-2xl w-full max-w-md border-2 border-pro-gold/20 overflow-hidden"
                    >
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={closeVoiceModal}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </motion.button>

                        <div className="flex flex-col items-center text-center gap-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="w-20 h-20 rounded-full bg-pro-green/10 flex items-center justify-center mb-2"
                            >
                                <Mic className="w-10 h-10 text-pro-green" />
                            </motion.div>

                            <div>
                                <h3 className="text-pro-xl font-bold text-pro-dark mb-2">오늘의 목소리 체조</h3>
                                <p className="text-pro-sm text-gray-500">배우의 감정을 담아 따라해 보세요!</p>
                            </div>

                            <div className="w-full space-y-2">
                                <div className="bg-pro-dark text-white text-xs py-1 px-3 rounded-full inline-block mb-1">
                                    영화 '{currentQuote.movie}' 中
                                </div>
                                <div className="text-sm text-gray-500 italic mb-2">
                                    {currentQuote.scene}
                                </div>
                                <div className="bg-pro-beige p-6 rounded-pro-btn w-full border border-pro-gold/30 shadow-inner">
                                    <p className="text-pro-lg font-bold text-pro-dark break-keep leading-relaxed whitespace-pre-line">
                                        "{currentQuote.quote}"
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 w-full">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={setRandomQuote}
                                    className="flex-1 py-3 px-4 rounded-pro-btn border-2 border-pro-green text-pro-green font-bold hover:bg-pro-green/5 transition-colors flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    다른 대사
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={closeVoiceModal}
                                    className="flex-1 py-3 px-4 rounded-pro-btn bg-pro-green text-white font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Check className="w-4 h-4" />
                                    완료
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
