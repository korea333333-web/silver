import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-pro-beige p-6 font-sans">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-pro-xl text-pro-green font-bold">The Pro Lounge</h1>
        <div className="text-pro-sm text-pro-dark">
          오늘도 성장을 멈추지 않는 프로님을 응원합니다.
        </div>
      </header>

      <main className="flex flex-col gap-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-pro-card p-10 shadow-lg border-2 border-pro-gold/30">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-8 h-8 text-pro-gold fill-current" />
            <h2 className="text-pro-xl font-bold text-pro-dark">오늘의 목소리 체조</h2>
          </div>
          <p className="text-pro-base text-gray-600 mb-8">
            하루 5분, 맑고 힘 있는 목소리를 위한 트레이닝을 시작해보세요.
          </p>
          <button className="bg-pro-green text-white text-pro-lg px-8 py-4 rounded-pro-btn hover:bg-opacity-90 transition-all flex items-center gap-2">
            시작하기 <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-pro-card p-8 shadow-md">
            <h3 className="text-pro-lg font-bold text-pro-dark mb-4">AI 비서 마스터</h3>
            <p className="text-pro-sm text-gray-600">디지털 세상의 똑똑한 비서를 내 것으로 만들어보세요.</p>
          </div>
          <div className="bg-white rounded-pro-card p-8 shadow-md">
            <h3 className="text-pro-lg font-bold text-pro-dark mb-4">활력 충전소</h3>
            <p className="text-pro-sm text-gray-600">건강하고 활기찬 일상을 위한 팁을 확인하세요.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
