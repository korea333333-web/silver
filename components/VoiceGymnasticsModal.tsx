import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, RefreshCw, Check, Activity, Award } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useState, useEffect, useRef } from 'react';

type EvaluationResult = {
    score: number;
    volumeParam: string;
    toneParam: string;
    feedback: string;
};

const POSITIVE_FEEDBACKS = [
    { text: "와우! 목소리에서 자신감이 뿜어져 나와요. 오늘 하루 다 잘 될 것 같은데요?", score: 98, tone: "활기참" },
    { text: "아나운서인 줄 알았어요! 전달력이 정말 완벽합니다.", score: 95, tone: "명료함" },
    { text: "목소리가 따뜻해서 듣는 사람 기분까지 좋아지게 만드네요.", score: 92, tone: "따뜻함" },
    { text: "배우 지망생이신가요? 감정 표현이 살아있어요!", score: 96, tone: "감성적" },
    { text: "성량이 아주 풍부하시네요! 에너지가 넘칩니다.", score: 94, tone: "파워풀" },
];

export default function VoiceGymnasticsModal() {
    const { isVoiceModalOpen, closeVoiceModal, currentQuote, setRandomQuote } = useStore();
    const [status, setStatus] = useState<'idle' | 'recording' | 'analyzing' | 'result'>('idle');
    const [audioData, setAudioData] = useState<number[]>(new Array(5).fill(10)); // For visualizer
    const [result, setResult] = useState<EvaluationResult | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Reset state when modal opens/closes
    useEffect(() => {
        if (!isVoiceModalOpen) {
            stopRecording();
            setStatus('idle');
            setResult(null);
        }
    }, [isVoiceModalOpen]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(stream);

            source.connect(analyser);
            analyser.fftSize = 32;

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            sourceRef.current = source;

            setStatus('recording');
            visualize();
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("마이크 사용 권한이 필요합니다.");
        }
    };

    const visualize = () => {
        if (!analyserRef.current) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const update = () => {
            analyserRef.current?.getByteFrequencyData(dataArray);
            // Pick 5 representative frequencies
            const newAudioData = [
                dataArray[1],
                dataArray[3],
                dataArray[5],
                dataArray[7],
                dataArray[9]
            ].map(val => Math.max(10, val)); // Min height 10

            setAudioData(newAudioData);
            animationFrameRef.current = requestAnimationFrame(update);
        };

        update();
    };

    const stopRecording = () => {
        if (sourceRef.current) {
            sourceRef.current.mediaStream.getTracks().forEach(track => track.stop());
            sourceRef.current.disconnect();
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
        setAudioData(new Array(5).fill(10));
    };

    const finishRecording = () => {
        stopRecording();
        setStatus('analyzing');

        // Simulate analysis delay
        setTimeout(() => {
            const randomFeedback = POSITIVE_FEEDBACKS[Math.floor(Math.random() * POSITIVE_FEEDBACKS.length)];
            const randomVolume = Math.floor(Math.random() * (95 - 80) + 80); // 80~95 dB

            setResult({
                score: randomFeedback.score,
                volumeParam: `${randomVolume}dB (아주 좋음)`,
                toneParam: randomFeedback.tone,
                feedback: randomFeedback.text
            });
            setStatus('result');
        }, 2000);
    };

    const handleClose = () => {
        stopRecording();
        closeVoiceModal();
    };

    return (
        <AnimatePresence>
            {isVoiceModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
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
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </motion.button>

                        <div className="flex flex-col items-center text-center gap-6">

                            {/* Header / Visualizer Area */}
                            <div className="h-24 flex items-center justify-center w-full">
                                {status === 'idle' && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-20 h-20 rounded-full bg-pro-green/10 flex items-center justify-center"
                                    >
                                        <Mic className="w-10 h-10 text-pro-green" />
                                    </motion.div>
                                )}

                                {status === 'recording' && (
                                    <div className="flex items-end justify-center gap-1 h-16">
                                        {audioData.map((height, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: `${height / 255 * 100}%` }}
                                                className="w-3 bg-red-500 rounded-full"
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            />
                                        ))}
                                    </div>
                                )}

                                {status === 'analyzing' && (
                                    <div className="flex flex-col items-center">
                                        <Activity className="w-12 h-12 text-blue-500 animate-pulse mb-2" />
                                        <p className="text-pro-sm text-blue-500 font-bold animate-pulse">목소리 분석 중...</p>
                                    </div>
                                )}

                                {status === 'result' && (
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center border-4 border-yellow-400"
                                    >
                                        <Award className="w-10 h-10 text-yellow-600" />
                                    </motion.div>
                                )}
                            </div>

                            {/* Content Area */}
                            {status !== 'result' ? (
                                <>
                                    <div>
                                        <h3 className="text-pro-xl font-bold text-pro-dark mb-2">오늘의 목소리 체조</h3>
                                        <p className="text-pro-sm text-gray-500">
                                            {status === 'recording' ? "큰 소리로 따라 읽어주세요!" : "배우의 감정을 담아 따라해 보세요!"}
                                        </p>
                                    </div>

                                    <div className="w-full space-y-2">
                                        <div className="bg-pro-dark text-white text-xs py-1 px-3 rounded-full inline-block mb-1">
                                            영화 '{currentQuote.movie}' 中
                                        </div>
                                        <div className="text-sm text-gray-500 italic mb-2">
                                            {currentQuote.scene}
                                        </div>
                                        <div className={`bg-pro-beige p-6 rounded-pro-btn w-full border border-pro-gold/30 shadow-inner transition-colors ${status === 'recording' ? 'border-red-400 bg-red-50' : ''}`}>
                                            <p className="text-pro-lg font-bold text-pro-dark break-keep leading-relaxed whitespace-pre-line">
                                                "{currentQuote.quote}"
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="w-full bg-blue-50 p-6 rounded-2xl border border-blue-100 text-left"
                                >
                                    <div className="flex justify-between items-center mb-4 border-b border-blue-200 pb-2">
                                        <span className="text-blue-800 font-bold text-lg">AI 분석 결과</span>
                                        <span className="text-2xl font-black text-blue-600">{result?.score}점</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">성량 (Volume)</span>
                                            <span className="font-bold text-gray-800">{result?.volumeParam}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">톤 (Tone)</span>
                                            <span className="font-bold text-gray-800">{result?.toneParam}</span>
                                        </div>
                                        <div className="bg-white p-3 rounded-xl mt-3 border border-blue-100">
                                            <p className="text-blue-800 font-medium text-sm">
                                                "{result?.feedback}"
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 w-full">
                                {status === 'idle' && (
                                    <>
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
                                            onClick={startRecording}
                                            className="flex-1 py-3 px-4 rounded-pro-btn bg-red-500 text-white font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-200"
                                        >
                                            <Mic className="w-4 h-4" />
                                            녹음 시작
                                        </motion.button>
                                    </>
                                )}

                                {status === 'recording' && (
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={finishRecording}
                                        className="w-full py-4 rounded-pro-btn bg-gray-900 text-white font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                                    >
                                        <div className="w-3 h-3 bg-red-500 rounded-sm animate-pulse" />
                                        녹음 완료 (분석하기)
                                    </motion.button>
                                )}

                                {status === 'result' && (
                                    <>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setStatus('idle');
                                                setRandomQuote();
                                            }}
                                            className="flex-1 py-3 px-4 rounded-pro-btn border-2 border-pro-green text-pro-green font-bold hover:bg-pro-green/5 transition-colors"
                                        >
                                            다시 하기
                                        </motion.button>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleClose}
                                            className="flex-1 py-3 px-4 rounded-pro-btn bg-pro-green text-white font-bold hover:bg-opacity-90 transition-colors"
                                        >
                                            완료
                                        </motion.button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
