import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Camera, LogIn, Save } from 'lucide-react';
import { useStore } from '@/lib/store';
import { useRef, useState, useEffect } from 'react';

export default function ProfileModal() {
    const { isProfileModalOpen, closeProfileModal, profile, updateProfile } = useStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [localName, setLocalName] = useState(profile.name);

    useEffect(() => {
        setLocalName(profile.name);
    }, [profile.name, isProfileModalOpen]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            updateProfile({ image: imageUrl });
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalName(e.target.value);
    };

    const handleSave = () => {
        updateProfile({ name: localName });
        closeProfileModal();
    };

    const handleSignup = () => {
        // Simulate signup process
        updateProfile({ isNewUser: false });
        alert("회원가입이 완료되었습니다! (시뮬레이션)");
    };

    return (
        <AnimatePresence>
            {isProfileModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeProfileModal}
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
                            onClick={closeProfileModal}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6 text-gray-500" />
                        </motion.button>

                        <div className="flex flex-col items-center text-center gap-6">
                            <h3 className="text-pro-xl font-bold text-pro-dark">내 프로필</h3>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative group cursor-pointer"
                                onClick={handleImageClick}
                            >
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pro-gold/30 bg-gray-100 flex items-center justify-center shadow-md">
                                    {profile.image ? (
                                        <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-16 h-16 text-gray-400" />
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                                <div className="absolute bottom-0 right-0 bg-pro-dark p-2 rounded-full border-2 border-white">
                                    <Camera className="w-4 h-4 text-white" />
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </motion.div>

                            <div className="w-full">
                                <label className="block text-left text-sm font-bold text-gray-500 mb-1 ml-1">이름</label>
                                <input
                                    type="text"
                                    value={localName}
                                    onChange={handleNameChange}
                                    className="w-full p-4 rounded-pro-btn border-2 border-gray-200 text-pro-lg font-bold text-center focus:border-pro-green focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="w-full flex gap-3">
                                {profile.isNewUser ? (
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSignup}
                                        className="w-full py-3 bg-pro-dark text-white rounded-pro-btn font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all"
                                    >
                                        <LogIn className="w-5 h-5" />
                                        간편 회원가입
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSave}
                                        className="w-full py-3 bg-pro-green text-white rounded-pro-btn font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all"
                                    >
                                        <Save className="w-5 h-5" />
                                        저장하기
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
