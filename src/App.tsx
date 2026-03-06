import React, { useState, useMemo } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import {
  Search,
  User,
  ChevronRight,
  FileText,
  Activity,
  Calendar,
  Heart,
  Loader2,
  Trophy,
  ShieldCheck,
  Users,
  Brain,
  Zap,
  Target,
  Smile,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChildData, StructuredReport } from './types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const INITIAL_DATA: ChildData = {
  name: '',
  age: 7,
  gender: 'male',
  scores: {
    concentration: 3.0,
    emotionalRegulation: 3.0,
    socialSkills: 3.0,
    selfRegulation: 3.0,
    challenge: 3.0,
    coordination: 3.0,
    balance: 3.0,
    confidence: 3.0,
    etiquette: 3.0,
    classAttitude: 3.0,
  },
  observations: '',
};

const SCORE_LABELS: Record<keyof ChildData['scores'], string> = {
  concentration: '집중력',
  emotionalRegulation: '정서조절',
  socialSkills: '사회성',
  selfRegulation: '자기조절',
  challenge: '도전성',
  coordination: '신체협응',
  balance: '균형감각',
  confidence: '자신감',
  etiquette: '예절',
  classAttitude: '수업태도',
};

const SCORE_ICONS: Record<keyof ChildData['scores'], React.ReactNode> = {
  concentration: <Brain className="w-4 h-4" />,
  emotionalRegulation: <Heart className="w-4 h-4" />,
  socialSkills: <Users className="w-4 h-4" />,
  selfRegulation: <ShieldCheck className="w-4 h-4" />,
  challenge: <Zap className="w-4 h-4" />,
  coordination: <Activity className="w-4 h-4" />,
  balance: <Target className="w-4 h-4" />,
  confidence: <Trophy className="w-4 h-4" />,
  etiquette: <Smile className="w-4 h-4" />,
  classAttitude: <BookOpen className="w-4 h-4" />,
};

export default function App() {
  const [formData, setFormData] = useState<ChildData>(INITIAL_DATA);
  const [report, setReport] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chartData = useMemo(() => {
    return Object.entries(formData.scores).map(([key, value]) => ({
      subject: SCORE_LABELS[key as keyof ChildData['scores']],
      A: value,
      fullMark: 5,
    }));
  }, [formData.scores]);

  const handleScoreChange = (key: keyof ChildData['scores'], value: number) => {
    setFormData(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [key]: value
      }
    }));
  };

  const generateReport = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const reportPrompt = `
        [KickKorea AI REPORT ENGINE]
        Version: 1.0
        Status: LOCKED
        Purpose: 태권도 기반 아동 발달 분석 및 운동 처방 리포트 생성

        이 프롬프트는 KickKorea AI 리포트 생성의 핵심 엔진입니다. 다음 규칙을 반드시 지킵니다.
        1. 리포트 구조는 절대 변경하지 않습니다.
        2. 문장 톤과 전문성을 유지합니다.
        3. 섹션 구조를 변경하지 않습니다.
        4. 아동 발달 심리 기준을 반영합니다.
        5. 모든 해석은 태권도 훈련 처방과 연결합니다.

        다음 아동의 데이터를 분석하여 전문적인 성장 리포트를 작성해줘.

        아동 정보:
        이름: ${formData.name}
        나이: ${formData.age}세
        성별: ${formData.gender === 'male' ? '남' : '여'}
        
        발달 영역 점수 (1.0 ~ 5.0 점, 평균 3.0):
        ${Object.entries(formData.scores).map(([key, val]) => `- ${SCORE_LABELS[key as keyof ChildData['scores']]}: ${(val as number).toFixed(1)}`).join('\n')}
        
        지도자 관찰 내용:
        ${formData.observations || '특이사항 없음'}

        점수 해석 기준:
        - 1.0 ~ 2.4: 발달이 진행 중인 영역 (성장 과정), 반복 훈련을 통해 성장 가능
        - 2.5 ~ 3.4: 또래 평균 수준, 안정적인 발달 단계
        - 3.5 ~ 5.0: 강점 영역, 자신감과 성취 경험 강화

        리포트 작성 원칙 (미세조정 규칙 적용):
        1. 아동의 나이(${formData.age}세)를 기준으로 다음 연령별 발달 특징을 자연스럽게 반영하여 설명한다.
           - [5~7세]: 신체 활동 중심 학습, 짧은 집중 시간과 잦은 활동 전환, 직선적 감정 표현, 또래 상호작용을 통한 사회성 발달 단계
           - [8~10세]: 규칙 이해와 자기조절 능력 안정화, 협동 활동을 통한 책임감 발달, 성취 경험을 통한 자신감 강화, 집중 지속 시간 연장
           - [11~13세]: 논리적 사고와 자기 평가 능력 발달, 또래 관계/성취 경험이 자존감에 큰 영향, 목표 의식과 책임감 발달, 자기 통제 능력 안정화
        2. 각 영역 점수 해석 시 반드시 "또래 평균" 기준(평균 수준, 평균에 근접, 평균보다 낮은 편, 평균보다 안정적 등)을 포함하여 부모가 이해하기 쉽게 설명한다.
        3. "발달 과정에 있습니다", "성장 과정입니다" 등의 표현이 과도하게 반복되지 않도록 다양하고 풍부한 어휘를 사용한다.
        4. 일반론이 아닌, 지도자 관찰 내용에 기반한 아동의 개별적 행동 특징(수업 태도, 감정 표현, 또래 관계 등)을 문장에 녹여낸다.
        5. 각 영역 설명 후 태권도 훈련(품새, 줄넘기, 협동, 균형, 겨루기 등)과의 연결 고리를 명확히 하고, 해당 훈련이 왜 도움이 되는지 구체적으로 설명한다.
        6. 전문적인 아동발달 상담 리포트 톤(~이 관찰됩니다, ~하는 모습이 있습니다, ~경향이 있습니다, ~가능성이 있습니다 등)을 유지한다.
        7. 아동에게 부정적인 낙인을 찍지 않으며, 모든 영역에서 아이의 무한한 성장 가능성을 강조한다.
        8. 리포트 본래의 JSON 구조(summary, personalityProfile, keyAnalyses, prescription, program, parentMessage)를 엄격히 준수한다.

        출력 포맷 강제 규칙:
        - 결과는 반드시 JSON 형식으로 출력하세요.
        - JSON 구조:
        {
          "summary": "종합 성장 요약",
          "personalityProfile": "성격 프로파일 분석",
          "keyAnalyses": [
            {
              "area": "집중력",
              "score": 3.0,
              "description": "발달 해석",
              "recommendation": "태권도 훈련 추천"
            }
          ],
          "prescription": "태권도 훈련 처방",
          "program": "4주 훈련 프로그램",
          "parentMessage": "부모 코칭 메시지"
        }

        [출력 형식 절대 규칙]
        - 출력은 반드시 "순수 JSON" 형식이어야 한다.
        - JSON 앞뒤에 어떤 문자도 절대 넣지 않는다.
        - Markdown 사용을 금지한다.
        - \`\`\` 또는 \`\`\`json 코드블록을 절대 사용하지 않는다.
        - 설명, 주석, 안내 문장 절대 금지.
        - 오직 JSON 객체만 출력한다.
        - JSON은 반드시 { 로 시작하고 } 로 끝나야 한다.

        규칙을 어기면 전체를 다시 작성한다.
      `;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: reportPrompt }),
      });

      const data = await res.json();

      // 서버가 {text:"..."} 형태로 fallback 줄 수도 있음
      if (data && typeof data === "object" && "text" in data) {
        setReport(data.text);
        return;
      }

      // 정상 케이스: JSON 객체(summary/story/...) 그대로
      setReport(data);
    } catch (e: any) {
      console.error(e);
      const msg = e?.message || String(e);
      setError(msg);
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-secondary font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-serif italic text-xl">
              K
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">KickKorea AI</h1>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Child Development Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-brand-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 space-y-8">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-brand-primary" />
                기본 정보
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">이름</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="아이의 이름을 입력하세요"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">나이</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={e => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">성별</label>
                    <select
                      value={formData.gender}
                      onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value as any }))}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                    >
                      <option value="male">남아</option>
                      <option value="female">여아</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-primary" />
                발달 영역 평가 (1.0 ~ 5.0)
              </h2>
              <div className="space-y-6">
                {Object.entries(formData.scores).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <span className="text-brand-primary">{SCORE_ICONS[key as keyof ChildData['scores']]}</span>
                        {SCORE_LABELS[key as keyof ChildData['scores']]}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full",
                          (value as number) < 2.5 ? "bg-orange-100 text-orange-600" :
                            (value as number) < 3.5 ? "bg-blue-100 text-blue-600" :
                              "bg-green-100 text-green-600"
                        )}>
                          {(value as number) < 2.5 ? "성장 과정" : (value as number) < 3.5 ? "평균 수준" : "강점 영역"}
                        </span>
                        <span className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-full">{(value as number).toFixed(1)}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="0.1"
                      value={value as number}
                      onChange={e => handleScoreChange(key as keyof ChildData['scores'], parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-primary" />
                지도자 관찰 내용
              </h2>
              <textarea
                value={formData.observations}
                onChange={e => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                placeholder="빚나는 장면,아쉬운점,또래관계,다음달 목표 등 자유롭게 적어주세요."
                className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all resize-none"
              />
            </section>

            <button
              onClick={generateReport}
              disabled={isLoading || !formData.name}
              className={cn(
                "w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2",
                isLoading || !formData.name ? "bg-gray-300 cursor-not-allowed" : "bg-brand-accent hover:bg-brand-accent/90 active:scale-[0.98]"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  AI 분석 중...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  성장 리포트 생성하기
                </>
              )}
            </button>
          </div>

          {/* Right Column: Visualization & Report */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 overflow-hidden">
              <h2 className="text-lg font-bold mb-8 flex items-center gap-2">
                <Target className="w-5 h-5 text-brand-primary" />
                발달 밸런스 차트
              </h2>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} />
                    <Radar
                      name="발달 상태"
                      dataKey="A"
                      stroke="#5A5A40"
                      fill="#5A5A40"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-4">
                {Object.entries(formData.scores).map(([key, value]) => (
                  <div key={key} className="text-center p-3 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex justify-center text-brand-primary mb-1 opacity-50">
                      {SCORE_ICONS[key as keyof ChildData['scores']]}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1">
                      {SCORE_LABELS[key as keyof ChildData['scores']]}
                    </div>
                    <div className="text-sm font-bold text-gray-900">{(value as number).toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </section>

            {report && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {typeof report === "string" ? (
                  <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                        <FileText className="w-5 h-5" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">분석 결과</h2>
                    </div>
                    <pre className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                      {report}
                    </pre>
                  </section>
                ) : (
                  <>
                    {/* AI Development Analysis Section */}
                    <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">AI 발달 분석</h2>
                      </div>

                      <div className="mb-10">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <ArrowRight className="w-3 h-3" />
                          종합 성장 요약
                        </h3>
                        <div className="p-6 bg-brand-secondary rounded-2xl border border-brand-primary/5 text-gray-800 leading-relaxed font-medium">
                          {report.summary}
                        </div>
                      </div>

                      <div className="mb-10">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <ArrowRight className="w-3 h-3" />
                          성격 프로파일 분석
                        </h3>
                        <div className="p-6 bg-white rounded-2xl border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {report.personalityProfile}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <ArrowRight className="w-3 h-3" />
                          주요 발달 영역 해석
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          {report.keyAnalyses?.map((analysis: any, idx: number) => (
                            <div key={idx} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                                    {analysis.area === '집중력' && <Brain className="w-4 h-4" />}
                                    {analysis.area === '정서조절' && <Heart className="w-4 h-4" />}
                                    {analysis.area === '사회성' && <Users className="w-4 h-4" />}
                                    {analysis.area === '신체협응' && <Activity className="w-4 h-4" />}
                                    {analysis.area === '자신감' && <Trophy className="w-4 h-4" />}
                                    {!['집중력', '정서조절', '사회성', '신체협응', '자신감'].includes(analysis.area) && <Sparkles className="w-4 h-4" />}
                                  </div>
                                  <h4 className="font-bold text-gray-900">{analysis.area}</h4>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Score</span>
                                  <span className="text-sm font-bold text-brand-primary">{analysis.score?.toFixed(1)}</span>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">발달 해석</div>
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                    {analysis.description}
                                  </p>
                                </div>

                                <div className="flex items-start gap-2 p-3 bg-brand-primary/5 rounded-xl border border-brand-primary/10">
                                  <Zap className="w-3 h-3 text-brand-accent mt-1 shrink-0" />
                                  <div className="text-xs font-semibold text-brand-primary italic">
                                    태권도 코칭: {analysis.recommendation}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* Detailed Report Section */}
                    <section className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent">
                            <Award className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">{formData.name} 수련생 상세 리포트</h2>
                            <p className="text-sm text-gray-500">{new Date().toLocaleDateString('ko-KR')} 발행</p>
                          </div>
                        </div>
                        <button
                          onClick={() => window.print()}
                          className="flex items-center gap-2 text-sm font-bold text-brand-primary hover:underline"
                        >
                          <FileText className="w-4 h-4" />
                          PDF 저장
                        </button>
                      </div>

                      <div className="space-y-12">
                        <div>
                          <h3 className="text-lg font-bold text-brand-primary mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            태권도 훈련 처방
                          </h3>
                          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {report.prescription}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-brand-primary mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            4주 훈련 프로그램
                          </h3>
                          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {report.program}
                          </div>
                        </div>

                        <div className="p-8 bg-brand-secondary rounded-3xl border border-brand-primary/10">
                          <h3 className="text-lg font-bold text-brand-primary mb-4 flex items-center gap-2">
                            <Heart className="w-5 h-5" />
                            부모 코칭 메시지
                          </h3>
                          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap italic">
                            {report.parentMessage}
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}
              </div>
            )}

            {!report && !isLoading && (
              <div className="h-[600px] flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-gray-200 rounded-3xl">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Brain className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">분석 결과가 여기에 표시됩니다</h3>
                <p className="text-gray-400 max-w-xs mx-auto">
                  왼쪽 폼에 아이의 정보를 입력하고 '성장 리포트 생성하기' 버튼을 눌러주세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer / Bottom Nav */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 py-4 px-6 z-20">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <button className="flex flex-col items-center gap-1 text-brand-primary">
              <Activity className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Analysis</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-primary transition-colors">
              <Calendar className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Schedule</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-brand-primary transition-colors">
              <Users className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Students</span>
            </button>
          </div>
          <div className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
            © 2026 KickKorea AI
          </div>
        </div>
      </footer>
    </div>
  );
}
