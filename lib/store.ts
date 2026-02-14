import { create } from 'zustand';

interface MovieQuote {
    movie: string;
    scene: string;
    quote: string;
}

interface UserProfile {
    name: string;
    image: string | null;
    isNewUser: boolean;
}

interface VoiceGymnasticsState {
    currentQuote: MovieQuote;
    isVoiceModalOpen: boolean;
    openVoiceModal: () => void;
    closeVoiceModal: () => void;
    setRandomQuote: () => void;
}

interface ProfileState {
    profile: UserProfile;
    isProfileModalOpen: boolean;
    openProfileModal: () => void;
    closeProfileModal: () => void;
    updateProfile: (updates: Partial<UserProfile>) => void;
}

interface AppState extends VoiceGymnasticsState, ProfileState { }

const MOVIE_QUOTES: MovieQuote[] = [
    {
        movie: "타짜",
        scene: "정마담이 평경장과의 관계를 묻는 경찰에게",
        quote: "나 이대 나온 여자야."
    },
    {
        movie: "부당거래",
        scene: "검사 주양(류승범)이 경찰 최철기(황정민)에게",
        quote: "호의가 계속되면, 그게 권리인 줄 알아요."
    },
    {
        movie: "범죄와의 전쟁",
        scene: "최익현(최민식)이 구치소에서 형사에게 허세를 부리며",
        quote: "내가 임마! 느그 서장이랑 임마! 어! 남천동 살고! 어! 다 했어!"
    },
    {
        movie: "범죄와의 전쟁",
        scene: "최익현(최민식)이 하정우의 조직원들을 보며",
        quote: "살아있네."
    },
    {
        movie: "베테랑",
        scene: "조태오(유아인)가 임금 체불 문제로 찾아온 기사에게",
        quote: "어이가 없네?"
    },
    {
        movie: "곡성",
        scene: "효진이가 굿을 하지 말라고 소리치며",
        quote: "뭣이 중헌디? 뭣이 중허냐고!"
    },
    {
        movie: "킹스맨",
        scene: "해리 하트(콜린 퍼스)가 펍에서 불량배들을 교육하며",
        quote: "Manners maketh man. (매너가 사람을 만든다.)"
    },
    {
        movie: "살인의 추억",
        scene: "박두만(송강호)이 용의자를 취조하다가",
        quote: "밥은 먹고 다니냐?"
    },
    {
        movie: "올드보이",
        scene: "오대수(최민식)가 자신을 가둔 사람을 찾으며",
        quote: "누구냐 넌."
    },
    {
        movie: "신세계",
        scene: "이자성(이정재)이 회장 자리에 오르며",
        quote: "거 죽기 딱 좋은 날씨네."
    },
    {
        movie: "해바라기",
        scene: "오태식(김래원)이 배신자들을 찾아가서",
        quote: "꼭 그렇게 다 가져가야만 했냐!?"
    },
    {
        movie: "달콤한 인생",
        scene: "강사장(김영철)이 선우(이병헌)에게",
        quote: "넌 나에게 모욕감을 줬어."
    }
];

export const useStore = create<AppState>((set) => ({
    // Voice Gymnastics State
    currentQuote: MOVIE_QUOTES[0],
    isVoiceModalOpen: false,
    openVoiceModal: () => {
        const randomQuote = MOVIE_QUOTES[Math.floor(Math.random() * MOVIE_QUOTES.length)];
        set({ isVoiceModalOpen: true, currentQuote: randomQuote });
    },
    closeVoiceModal: () => set({ isVoiceModalOpen: false }),
    setRandomQuote: () => {
        const randomQuote = MOVIE_QUOTES[Math.floor(Math.random() * MOVIE_QUOTES.length)];
        set({ currentQuote: randomQuote });
    },

    // Profile State
    profile: {
        name: 'Hong Gil-dong',
        image: null,
        isNewUser: true,
    },
    isProfileModalOpen: false,
    openProfileModal: () => set({ isProfileModalOpen: true }),
    closeProfileModal: () => set({ isProfileModalOpen: false }),
    updateProfile: (updates) => set((state) => ({
        profile: { ...state.profile, ...updates }
    })),
}));
