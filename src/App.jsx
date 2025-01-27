return (
  <motion.div className="min-h-screen bg-gray-50 p-4">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">US Fighter Jet Quiz</h1>
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";

// Expanded question set with new "insane" and "missiles" difficulties.
// We will randomize question order each time the user picks a difficulty.
// Each difficulty has 20 questions for easy, medium, and hard (16 old + 4 new), and 16 for insane/missiles.
// Only 5 will be used per session.

const ALL_QUESTIONS = [
  // Easy questions (16 total + 4 new = 20)
  {
    difficulty: "easy",
    question: "Which US fighter jet is known as the 'Viper' by its pilots?",
    options: ["F-14 Tomcat", "F-15 Eagle", "F-16 Fighting Falcon", "F/A-18 Hornet"],
    correctIndex: 2,
  },
  {
    difficulty: "easy",
    question: "Which US jet replaced the F-14 Tomcat on US Navy carriers?",
    options: ["F-15 Eagle", "F-35 Lightning II", "F/A-18 Super Hornet", "F-4 Phantom II"],
    correctIndex: 2,
  },
  {
    difficulty: "easy",
    question: "The F-4 Phantom II first flew in which decade?",
    options: ["1950s", "1960s", "1970s", "1980s"],
    correctIndex: 0,
  },
  {
    difficulty: "easy",
    question: "Which fighter was primarily developed as the US Navy's air superiority aircraft in the 1970s?",
    options: ["F-4 Phantom II", "F-14 Tomcat", "A-7 Corsair II", "S-3 Viking"],
    correctIndex: 1,
  },
  {
    difficulty: "easy",
    question: "Which fighter jet is famously associated with the Top Gun school?",
    options: ["F-14 Tomcat", "F-16 Fighting Falcon", "F-4 Phantom II", "F-18 Hornet"],
    correctIndex: 0,
  },
  {
    difficulty: "easy",
    question: "Which aircraft is primarily used for close air support and has a GAU-8 Avenger cannon?",
    options: ["A-10 Thunderbolt II", "F-15 Eagle", "F-35 Lightning II", "C-130 Hercules"],
    correctIndex: 0,
  },
  {
    difficulty: "easy",
    question: "Which US branch primarily operates the F-15 Eagle?",
    options: ["US Navy", "US Air Force", "US Marine Corps", "US Army"],
    correctIndex: 1,
  },
  {
    difficulty: "easy",
    question: "Which fighter was introduced as a low-cost, lightweight alternative to the F-15?",
    options: ["F-16 Fighting Falcon", "F-18 Hornet", "F-35 Lightning II", "F-22 Raptor"],
    correctIndex: 0,
  },
  {
    difficulty: "easy",
    question: "Which US fighter is also known as the 'Super Hornet'?",
    options: ["F/A-18E/F", "F-35C", "F-14D", "F-16C/D"],
    correctIndex: 0,
  },
  {
    difficulty: "easy",
    question: "Which of these fighters is a vertical/short takeoff and landing (V/STOL) aircraft used by the US Marines?",
    options: ["F-15E", "AV-8B Harrier II", "F-16C", "F-18C"],
    correctIndex: 1,
  },
  {
    difficulty: "easy",
    question: "Which US fighter was among the earliest to incorporate stealth technology?",
    options: ["F-16", "F-117", "F-35", "F-15C"],
    correctIndex: 1,
  },
  {
    difficulty: "easy",
    question: "Which US fighter primarily serves an Air Dominance role and was introduced in the 1970s?",
    options: ["F-4 Phantom II", "F-14 Tomcat", "F-15 Eagle", "F-22 Raptor"],
    correctIndex: 2,
  },
  {
    difficulty: "easy",
    question: "Which aircraft replaced the A-7 Corsair II on US Navy carriers?",
    options: ["F-15", "F-16", "F/A-18 Hornet", "F-4 Phantom II"],
    correctIndex: 2,
  },
  {
    difficulty: "easy",
    question: "Which US fighter is known by the nickname 'Raptor'?",
    options: ["F-22", "F-35", "F-15", "F/A-18"],
    correctIndex: 0,
  },
  {
    difficulty: "easy",
    question: "Which US fighter is famously painted in unique schemes by the USAF Thunderbirds demonstration team?",
    options: ["F-18", "F-16", "F-15", "F-14"],
    correctIndex: 1,
  },
  {
    difficulty: "easy",
    question: "Which US fighter is known for its twin tail design and Mach 2.2 top speed, introduced in the 1970s?",
    options: ["F-14 Tomcat", "F-15 Eagle", "F-16 Fighting Falcon", "F-18 Hornet"],
    correctIndex: 1,
  },
  // 4 new easy questions
  {
    difficulty: "easy",
    question: "Which American WWII fighter is commonly known as the 'Mustang'?",
    options: ["P-51", "P-38", "F4U Corsair", "P-47"],
    correctIndex: 0,
  },
  {
    difficulty: "easy",
    question: "Which early US jet fighter saw service in the Korean War?",
    options: ["F9F Panther", "F-86 Sabre", "F-4 Phantom II", "F2H Banshee"],
    correctIndex: 1,
  },
  {
    difficulty: "easy",
    question: "Which WWII prop fighter was famously flown by the Tuskegee Airmen?",
    options: ["P-51 Mustang", "P-47 Thunderbolt", "P-40 Warhawk", "F6F Hellcat"],
    correctIndex: 0,
  },
  {
    difficulty: "easy",
    question: "Which WWII US fighter was nicknamed the 'Jug'?",
    options: ["P-47 Thunderbolt", "P-40 Warhawk", "P-38 Lightning", "F4U Corsair"],
    correctIndex: 0,
  },

  // Medium questions (16 total + 4 new = 20)
  {
    difficulty: "medium",
    question: "Which of the following jets can achieve a thrust-to-weight ratio greater than 1 at combat weight?",
    options: ["A-10 Thunderbolt II", "F-16 Fighting Falcon", "KC-135 Stratotanker", "B-52 Stratofortress"],
    correctIndex: 1,
  },
  {
    difficulty: "medium",
    question: "The maximum speed of the F-15 Eagle is approximately:",
    options: ["Mach 1.8", "Mach 2.5", "Mach 2.0", "Mach 3.0"],
    correctIndex: 1,
  },
  {
    difficulty: "medium",
    question: "Which aircraft is known for its unique 'BRRRRRT' cannon sound?",
    options: ["F-18 Hornet", "F-16 Viper", "A-10 Thunderbolt II", "AV-8B Harrier"],
    correctIndex: 2,
  },
  {
    difficulty: "medium",
    question: "Which US fighter jet is nicknamed the 'Eagle'?",
    options: ["F-15", "F-18", "F-5", "F-16"],
    correctIndex: 0,
  },
  {
    difficulty: "medium",
    question: "Which aircraft replaced the F-111 Aardvark in some roles, especially the strike role?",
    options: ["F-15E Strike Eagle", "F-14 Tomcat", "A-10 Thunderbolt II", "F-35 Lightning II"],
    correctIndex: 0,
  },
  {
    difficulty: "medium",
    question: "Which US fighter demonstrated the ability to shoot down satellites in a 1985 test?",
    options: ["F-16 Fighting Falcon", "F-15 Eagle", "F-14 Tomcat", "F-18 Hornet"],
    correctIndex: 1,
  },
  {
    difficulty: "medium",
    question: "The F/A-18E/F Super Hornet is primarily operated by which branch?",
    options: ["US Navy", "US Air Force", "US Army", "US Coast Guard"],
    correctIndex: 0,
  },
  {
    difficulty: "medium",
    question: "Which US fighter has a single engine and was derived from a lightweight fighter concept in the 1970s?",
    options: ["F-15 Eagle", "F-16 Fighting Falcon", "F-4 Phantom II", "F-18 Hornet"],
    correctIndex: 1,
  },
  {
    difficulty: "medium",
    question: "Which US fighter had a primarily naval role but also served with the Iranian Air Force?",
    options: ["F-15C Eagle", "F-14 Tomcat", "F-16 Fighting Falcon", "F-18 Hornet"],
    correctIndex: 1,
  },
  {
    difficulty: "medium",
    question: "Which was the first operational US fighter capable of supercruise?",
    options: ["F-15 Eagle", "F-16 Fighting Falcon", "F-22 Raptor", "F-35 Lightning II"],
    correctIndex: 2,
  },
  {
    difficulty: "medium",
    question: "Which US fighter had the experimental STOL/MTD variant (short takeoff and landing, maneuver technology demonstration)?",
    options: ["F-15 Eagle", "F-16 Fighting Falcon", "F-18 Hornet", "F-14 Tomcat"],
    correctIndex: 1,
  },
  {
    difficulty: "medium",
    question: "Which US fighter has an internal weapons bay and is part of the JSF (Joint Strike Fighter) program?",
    options: ["F-15EX", "F-16C", "F-35 Lightning II", "F/A-18E/F"],
    correctIndex: 2,
  },
  {
    difficulty: "medium",
    question: "Which aircraft was introduced as a multi-role fighter and widely exported to allies under the Peace X programs?",
    options: ["F-16 Fighting Falcon", "F-15C Eagle", "F-14 Tomcat", "A-10 Thunderbolt II"],
    correctIndex: 0,
  },
  {
    difficulty: "medium",
    question: "Which US aircraft is known as the 'Hog' or 'Warthog' for close air support?",
    options: ["AV-8B Harrier II", "A-10 Thunderbolt II", "F-15E Strike Eagle", "F-4 Phantom II"],
    correctIndex: 1,
  },
  {
    difficulty: "medium",
    question: "Which twin-engine US fighter is known for its agility at low speeds and can operate from carriers and land bases?",
    options: ["F-18 Hornet", "F-16 Fighting Falcon", "F-15 Eagle", "A-10 Thunderbolt II"],
    correctIndex: 0,
  },
  {
    difficulty: "medium",
    question: "Which version of the F-15 was specialized for ground attack (the 'Beagle')?",
    options: ["F-15C", "F-15D", "F-15E", "F-15SE"],
    correctIndex: 2,
  },
  // 4 new medium questions
  {
    difficulty: "medium",
    question: "Which twin-boom WWII American fighter was the first to exceed 400 mph in level flight?",
    options: ["P-38 Lightning", "P-39 Airacobra", "P-40 Warhawk", "F6F Hellcat"],
    correctIndex: 0,
  },
  {
    difficulty: "medium",
    question: "Which advanced US jet entered service as one of the first operational single-jet designs, known as the 'Shooting Star'?",
    options: ["F-80", "F-84", "F-86", "F9F"],
    correctIndex: 0,
  },
  {
    difficulty: "medium",
    question: "Which WWII naval fighter, built by Vought, was known for its distinctive gull wings?",
    options: ["F4F Wildcat", "F6F Hellcat", "F4U Corsair", "SBD Dauntless"],
    correctIndex: 2,
  },
  {
    difficulty: "medium",
    question: "Which WWII US fighter was known for its radial engine and massive horsepower, particularly effective in ground attack?",
    options: ["P-51 Mustang", "F4F Wildcat", "P-47 Thunderbolt", "P-63 Kingcobra"],
    correctIndex: 2,
  },

  // Hard questions (16 total + 4 new = 20)
  {
    difficulty: "hard",
    question: "Which 5th-generation fighter jet has a maximum AOA (angle of attack) of around 50 degrees in controlled flight?",
    options: ["F-35 Lightning II", "F-22 Raptor", "F-15E Strike Eagle", "F-16C Viper"],
    correctIndex: 1,
  },
  {
    difficulty: "hard",
    question: "Which US fighter jet has the best instantaneous turn rate, historically measured at over 26 degrees per second?",
    options: ["F/A-18 Hornet", "F-4 Phantom II", "F-16 Fighting Falcon", "F-35 Lightning II"],
    correctIndex: 2,
  },
  {
    difficulty: "hard",
    question: "Which stealth fighter program was originally designated as the X-35 during development?",
    options: ["F-22 Raptor", "F-117 Nighthawk", "F-35 Lightning II", "B-2 Spirit"],
    correctIndex: 2,
  },
  {
    difficulty: "hard",
    question: "Which modern US fighter is capable of vectoring thrust for enhanced maneuverability?",
    options: ["F-16 Viper", "F-15C Eagle", "F-22 Raptor", "F/A-18E/F Super Hornet"],
    correctIndex: 2,
  },
  {
    difficulty: "hard",
    question: "Which US fighter is known to have a 9G airframe limit in many configurations, enabling high-sustained turns?",
    options: ["F-15C Eagle", "F-16 Fighting Falcon", "F/A-18E/F Super Hornet", "F-14 Tomcat"],
    correctIndex: 1,
  },
  {
    difficulty: "hard",
    question: "Which fighter in US service, tested under the LWF program, ended up with advanced fly-by-wire for stable flight?",
    options: ["F-15 Eagle", "F-14 Tomcat", "F-16 Fighting Falcon", "F-111 Aardvark"],
    correctIndex: 2,
  },
  {
    difficulty: "hard",
    question: "Which US 5th-generation fighter is specifically designed for short takeoff and vertical landing in one variant?",
    options: ["F-35 Lightning II", "F-22 Raptor", "F-15EX Eagle II", "F-117 Nighthawk"],
    correctIndex: 0,
  },
  {
    difficulty: "hard",
    question: "Which US fighter includes an integrated cannon designated M61 Vulcan with a fire rate of up to 6,000 rounds per minute?",
    options: ["F-4 Phantom II", "F-15 Eagle", "F-35 Lightning II", "All of the above (in some variants)"],
    correctIndex: 3,
  },
  {
    difficulty: "hard",
    question: "Which advanced sensor fusion system found on the F-35 allows pilots a 360° view and target tracking through the aircraft's skin?",
    options: ["APG-63 Radar", "AN/AAS-38 Nite Hawk", "Distributed Aperture System (DAS)", "IRST21"],
    correctIndex: 2,
  },
  {
    difficulty: "hard",
    question: "Which aircraft's stealth capabilities were tested with the Have Blue program leading to advanced shapes and coatings?",
    options: ["F-117 Nighthawk", "F-22 Raptor", "F-16 Viper", "B-1B Lancer"],
    correctIndex: 0,
  },
  {
    difficulty: "hard",
    question: "Which US fighter, with the older Pratt & Whitney engines, can supercruise above Mach 1.5 without afterburner?",
    options: ["F-15C Eagle", "F-22 Raptor", "F-16 Fighting Falcon", "F-35 Lightning II"],
    correctIndex: 1,
  },
  {
    difficulty: "hard",
    question: "Which stealth fighter was developed from the YF-22 prototype, beating the YF-23 in a US Air Force competition?",
    options: ["F-35 Lightning II", "F-22 Raptor", "F-15 Silent Eagle", "F-117 Nighthawk"],
    correctIndex: 1,
  },
  {
    difficulty: "hard",
    question: "Which US fighter can deploy internal and external weapons, with up to 18,000 pounds of ordnance capacity in some variants?",
    options: ["F-35 Lightning II", "F-18 E/F Super Hornet", "F-15E Strike Eagle", "F-14 Tomcat"],
    correctIndex: 2,
  },
  {
    difficulty: "hard",
    question: "Which US fighter is known for thrust vectoring nozzles that allow post-stall maneuvers such as the J-turn and Herbst maneuver?",
    options: ["F-22 Raptor", "F-35 Lightning II", "F-16 Fighting Falcon", "F/A-18 Hornet"],
    correctIndex: 0,
  },
  {
    difficulty: "hard",
    question: "Which US fighter was known in development as the ADF (Advanced Day Fighter) before evolving into a multi-role concept?",
    options: ["F-16 Fighting Falcon", "F-15 Eagle", "F-18 Hornet", "F-22 Raptor"],
    correctIndex: 0,
  },
  {
    difficulty: "hard",
    question: "Which advanced fighter jets participated in the ATF (Advanced Tactical Fighter) program demonstration in the early 1990s?",
    options: ["YF-15 vs. YF-17", "YF-16 vs. YF-17", "YF-22 vs. YF-23", "YF-32 vs. YF-35"],
    correctIndex: 2,
  },
  // 4 new hard questions
  {
    difficulty: "hard",
    question: "Which early American jet fighter used a swept wing design and fought against MiG-15s in Korea?",
    options: ["F-86 Sabre", "F-84 Thunderjet", "F-80 Shooting Star", "F9F Panther"],
    correctIndex: 0,
  },
  {
    difficulty: "hard",
    question: "Which WWII fighter had the first operational tricycle landing gear and a turbo-supercharged engine, facing issues with high-altitude performance?",
    options: ["P-63 Kingcobra", "P-39 Airacobra", "P-40 Warhawk", "P-51B Mustang"],
    correctIndex: 1,
  },
  {
    difficulty: "hard",
    question: "Which US WWII fighter was credited with the destruction of more enemy aircraft than any other American fighter in Europe?",
    options: ["P-51 Mustang", "P-47 Thunderbolt", "F6F Hellcat", "P-38 Lightning"],
    correctIndex: 0,
  },
  {
    difficulty: "hard",
    question: "Which radical WWII American fighter design featured twin booms and a central nacelle housing the pilot and armament?",
    options: ["P-38 Lightning", "P-61 Black Widow", "XP-55 Ascender", "P-82 Twin Mustang"],
    correctIndex: 0,
  },

  // INSANE questions (16 total)
  {
    difficulty: "insane",
    question: "Which radar system was used in the F-14 Tomcat for long-range detection?",
    options: ["AWG-9", "APG-63", "APG-73", "APG-77"],
    correctIndex: 0,
  },
  {
    difficulty: "insane",
    question: "Which advanced AESA radar is integrated into some modern F-15 variants (F-15C and F-15E)?",
    options: ["APG-79", "APG-82", "AWG-9", "AN/APQ-120"],
    correctIndex: 1,
  },
  {
    difficulty: "insane",
    question: "What is the approximate maximum range of the AWG-9 radar in the F-14 against large targets?",
    options: ["50 nm", "100 nm", "160 nm", "240 nm"],
    correctIndex: 2,
  },
  {
    difficulty: "insane",
    question: "Which US fighter introduced the APG-77 AESA radar?",
    options: ["F-15C", "F-22", "F-35", "F-18"],
    correctIndex: 1,
  },
  {
    difficulty: "insane",
    question: "Which US stealth aircraft famously used the APQ-181 radar for terrain-following flight?",
    options: ["F-117", "B-2", "B-1", "SR-71"],
    correctIndex: 1,
  },
  {
    difficulty: "insane",
    question: "Which sensor system is used by the F-35 for 360-degree situational awareness?",
    options: ["DAS", "TGP", "FLIR", "IRST"],
    correctIndex: 0,
  },
  {
    difficulty: "insane",
    question: "Which US fighter was equipped with the AN/AWG-10 radar in some early variants?",
    options: ["F-4 Phantom II", "F-8 Crusader", "F-14 Tomcat", "A-7 Corsair II"],
    correctIndex: 0,
  },
  {
    difficulty: "insane",
    question: "Which advanced version of the APG-63 was the first operational AESA radar in a US fighter?",
    options: ["APG-63(V)2", "APG-80", "APG-79", "APG-83"],
    correctIndex: 0,
  },
  {
    difficulty: "insane",
    question: "Which key advantage does AESA technology have over older mechanically scanned arrays?",
    options: ["Faster beam steering", "Higher raw power", "No moving parts", "Faster beam steering and no moving parts"],
    correctIndex: 3,
  },
  {
    difficulty: "insane",
    question: "Which US fighter's radar is designated AN/APG-81?",
    options: ["F-15EX", "F-16 Block 70", "F-35", "F-18 Super Hornet"],
    correctIndex: 2,
  },
  {
    difficulty: "insane",
    question: "What does 'MTI' stand for in radar terminology?",
    options: ["Multi-Target Interception", "Maximum Target Illumination", "Moving Target Indicator", "Multiple Transmission Interval"],
    correctIndex: 2,
  },
  {
    difficulty: "insane",
    question: "Which generation is the AN/APG-77 radar considered to be?",
    options: ["1st gen AESA", "2nd gen AESA", "3rd gen AESA", "Passive ESA"],
    correctIndex: 0,
  },
  {
    difficulty: "insane",
    question: "Which advanced IRST sensor is integrated on the F-14D and tested on others?",
    options: ["AAS-42", "LANTIRN", "Sniper ATP", "ATFLIR"],
    correctIndex: 0,
  },
  {
    difficulty: "insane",
    question: "Which US stealth aircraft relies heavily on faceted surfaces for low RCS, tested under Have Blue?",
    options: ["F-22", "F-35", "F-117", "B-2"],
    correctIndex: 2,
  },
  {
    difficulty: "insane",
    question: "Which US fighter tested the APG-63(V)3 AESA radar, providing extended detection range and better reliability?",
    options: ["F-15C", "F-16C", "F-18C", "F-22"],
    correctIndex: 0,
  },
  {
    difficulty: "insane",
    question: "Which system merges radar, ESM, and other sensors into a single fused display in the F-35?",
    options: ["EOTS", "DAS", "EO DAS", "Sensor Fusion"],
    correctIndex: 3,
  },

  // Missiles questions (16 total)
  {
    difficulty: "missiles",
    question: "Which missile is known by the NATO reporting name 'AA-2 Atoll'?",
    options: ["R-3", "R-27", "AIM-9 Sidewinder", "MICA"],
    correctIndex: 0,
  },
  {
    difficulty: "missiles",
    question: "Which US missile is often credited as the world's first operational air-to-air guided missile?",
    options: ["AIM-9 Sidewinder", "AIM-7 Sparrow", "AIM-120 AMRAAM", "AIM-54 Phoenix"],
    correctIndex: 0,
  },
  {
    difficulty: "missiles",
    question: "Which US missile was the first to provide a true beyond-visual-range capability with active radar homing?",
    options: ["AIM-9 Sidewinder", "AIM-7 Sparrow", "AIM-120 AMRAAM", "AIM-54 Phoenix"],
    correctIndex: 3,
  },
  {
    difficulty: "missiles",
    question: "Which missile is recognized for its imaging infrared seeker and thrust-vectoring controls, used by many modern fighters?",
    options: ["Python-5", "IRIS-T", "AIM-9X", "R-73"],
    correctIndex: 2,
  },
  {
    difficulty: "missiles",
    question: "Which BVR missile is commonly referred to as the 'Slammer'?",
    options: ["AIM-120 AMRAAM", "AIM-54 Phoenix", "R-77", "Meteor"],
    correctIndex: 0,
  },
  {
    difficulty: "missiles",
    question: "Which European missile features ramjet propulsion for extended range BVR engagements?",
    options: ["Meteor", "MICA", "IRIS-T", "AIM-120"],
    correctIndex: 0,
  },
  {
    difficulty: "missiles",
    question: "Which Russian missile features an off-boresight capability and is designated AA-11 Archer by NATO?",
    options: ["R-73", "R-77", "R-27", "R-3"],
    correctIndex: 0,
  },
  {
    difficulty: "missiles",
    question: "Which US missile used a semi-active radar homing system and was widely deployed since the Vietnam War?",
    options: ["AIM-7 Sparrow", "AIM-9 Sidewinder", "AIM-54 Phoenix", "AIM-120 AMRAAM"],
    correctIndex: 0,
  },
  {
    difficulty: "missiles",
    question: "Which missile is known for an extremely large warhead (approx. 100 kg) and was used on the F-14?",
    options: ["AIM-9X", "AIM-120D", "AIM-7M", "AIM-54 Phoenix"],
    correctIndex: 3,
  },
  {
    difficulty: "missiles",
    question: "Which short-range IR-guided missile, introduced by France, is known as Magic?",
    options: ["MICA", "R550", "ASRAAM", "R-60"],
    correctIndex: 1,
  },
  {
    difficulty: "missiles",
    question: "Which missile is the UK's advanced short-range air-to-air missile with high off-boresight capability?",
    options: ["IRIS-T", "AIM-9X", "Meteor", "ASRAAM"],
    correctIndex: 3,
  },
  {
    difficulty: "missiles",
    question: "Which Chinese BVR missile is designated PL-15 with active radar guidance?",
    options: ["PL-12", "PL-15", "PL-9", "PL-2"],
    correctIndex: 1,
  },
  {
    difficulty: "missiles",
    question: "Which Israeli BVR missile is known as 'Derby'?",
    options: ["Python-5", "Derby", "Shafrir-2", "Popeye"],
    correctIndex: 1,
  },
  {
    difficulty: "missiles",
    question: "Which advanced Indian-Russian collaborative supersonic cruise missile is designated PJ-10?",
    options: ["BrahMos", "Astra", "Nag", "Shaurya"],
    correctIndex: 0,
  },
  {
    difficulty: "missiles",
    question: "Which anti-ship missile is known as the Exocet?",
    options: ["Harpoon", "Sea Eagle", "Exocet", "Otomat"],
    correctIndex: 2,
  },
  {
    difficulty: "missiles",
    question: "Which US submarine-launched ballistic missile is designated Trident II (D5)?",
    options: ["Polaris", "Poseidon C3", "Trident II (D5)", "Tomahawk"],
    correctIndex: 2,
  },
];

function getQuestionsForDifficulty(difficulty) {
  return ALL_QUESTIONS.filter((q) => q.difficulty === difficulty);
}

function USFighterJetQuiz() {
  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizId, setQuizId] = useState(0); // helps re-randomize even on same difficulty

  // We'll track user attempts in localStorage, to compare current attempt with previous.
  // We'll store an array of objects: { date, difficulty, score, total }
  const [history, setHistory] = useState([]);

  // Load quiz history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Whenever difficulty OR quizId changes, get new questions, randomize order, and limit to 5
  useEffect(() => {
    const filteredQuestions = getQuestionsForDifficulty(difficulty);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const limited = shuffled.slice(0, 5);
    setQuestions(limited);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
    setUserAnswers([]);
  }, [difficulty, quizId]);

  const saveHistory = (newRecord) => {
    const updatedHistory = [...history, newRecord];
    setHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  };

  const restartQuiz = () => {
    // If we want to keep the same difficulty, just increment quizId
    setQuizId((prev) => prev + 1);
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      // check if correct
      if (selectedOption === questions[currentQuestionIndex].correctIndex) {
        setScore((prev) => prev + 1);
      }
      // store user's answer
      setUserAnswers((prev) => {
        const updated = [...prev];
        updated[currentQuestionIndex] = selectedOption;
        return updated;
      });
    }

    setSelectedOption(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // finish
      let finalScore = score;
      if (selectedOption !== null && selectedOption === questions[currentQuestionIndex].correctIndex) {
        finalScore++;
      }
      setScore(finalScore);
      setShowResults(true);
      // Save attempt to history
      saveHistory({
        date: new Date().toISOString(),
        difficulty,
        score: finalScore,
        total: questions.length,
      });
    }
  };

  // Compare with previous attempts
  // We will find the last attempt for the same difficulty (if any)
  let previousScore = null;
  let previousTotal = null;

  const sameDiffHistory = history.filter((item) => item.difficulty === difficulty);
  if (sameDiffHistory.length > 1) {
    // second to last is the one before the most recent
    const lastResult = sameDiffHistory[sameDiffHistory.length - 2];
    previousScore = lastResult.score;
    previousTotal = lastResult.total;
  } else if (sameDiffHistory.length === 1) {
    // There's a single attempt, no previous
    previousScore = null;
  }

  // If questions haven't loaded or are empty, handle gracefully
  if (!questions.length) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">US Fighter Jet Quiz</h1>
        <p>No questions available for this difficulty yet.</p>
      </div>
    );
  }

  // Prepare a list of missed questions if we are showing results
  let missedQuestions = [];
  if (showResults) {
    missedQuestions = questions
      .map((q, i) => {
        // if user didn't select the correct option
        if (userAnswers[i] !== q.correctIndex) {
          return {
            question: q.question,
            correctAnswer: q.options[q.correctIndex],
            userAnswer: userAnswers[i] !== undefined && userAnswers[i] !== null ? q.options[userAnswers[i]] : "No Answer",
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  const question = questions[currentQuestionIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-xl mx-auto p-4"
    >
      <h1 className="text-2xl font-bold mb-4">US Fighter Jet Quiz</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <Button variant={difficulty === "easy" ? "default" : "outline"} onClick={() => handleDifficultyChange("easy")}>Easy</Button>
        <Button variant={difficulty === "medium" ? "default" : "outline"} onClick={() => handleDifficultyChange("medium")}>Medium</Button>
        <Button variant={difficulty === "hard" ? "default" : "outline"} onClick={() => handleDifficultyChange("hard")}>Hard</Button>
        <Button variant={difficulty === "insane" ? "default" : "outline"} onClick={() => handleDifficultyChange("insane")}>Insane</Button>
        <Button variant={difficulty === "missiles" ? "default" : "outline"} onClick={() => handleDifficultyChange("missiles")}>Missiles</Button>
      </div>

      {showResults ? (
        <Card className="p-4 mb-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <p className="mb-2">You scored {score} out of {questions.length}.</p>
            {previousScore !== null ? (
              <p className="mb-2">
                Previous attempt: {previousScore}/{previousTotal}.<br/>
                Improvement (score difference): {(score - previousScore) >= 0 ? `+${score - previousScore}` : `${score - previousScore}` }.
              </p>
            ) : (
              <p className="mb-2">No previous attempt found to compare.</p>
            )}
            {missedQuestions.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Questions You Missed</h3>
                <ul className="list-disc list-inside space-y-2">
                  {missedQuestions.map((mq, i) => (
                    <li key={i}>
                      <p><strong>Q:</strong> {mq.question}</p>
                      <p><strong>Your Answer:</strong> {mq.userAnswer}</p>
                      <p><strong>Correct Answer:</strong> {mq.correctAnswer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Button onClick={restartQuiz}>Try Again</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="p-4 mb-4">
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1} of {questions.length}</h2>
              <p className="mb-4">{question.question}</p>
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedOption === index ? "default" : "outline"}
                  className="block w-full text-left mb-2"
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </Button>
              ))}
              <Button onClick={handleNext} className="mt-4">{currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}</Button>
            </CardContent>
          </Card>
        </>
      )}
      {history.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-2xl shadow">
          <div className="flex items-center mb-4">
            <BarChart2 className="mr-2" />
            <h3 className="font-semibold">Your Quiz History</h3>
          </div>
          <ul className="text-sm space-y-2">
            {history.map((h, i) => (
              <li key={i}>
                <strong>{h.difficulty.toUpperCase()}</strong> | {new Date(h.date).toLocaleString()} | Score: {h.score}/{h.total}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

export default USFighterJetQuiz;
    </div>
  </motion.div>
);
