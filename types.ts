export interface ChildData {
  name: string;
  age: number;
  gender: 'male' | 'female';
  scores: {
    concentration: number; // 집중력
    emotionalRegulation: number; // 정서조절
    socialSkills: number; // 사회성
    selfRegulation: number; // 자기조절
    challenge: number; // 도전성
    coordination: number; // 신체협응
    balance: number; // 균형감각
    confidence: number; // 자신감
    etiquette: number; // 예절
    classAttitude: number; // 수업태도
  };
  observations: string;
}

export interface AnalysisArea {
  area: string;
  score: number;
  description: string;
  recommendation: string;
}

export interface StructuredReport {
  summary: string;
  personalityProfile: string;
  keyAnalyses: AnalysisArea[];
  prescription: string;
  program: string;
  parentMessage: string;
}

export interface Report {
  summary: string;
  analysis: string;
  prescription: string;
  program: string;
  parentMessage: string;
}
