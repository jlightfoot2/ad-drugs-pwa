import {combineReducers} from 'redux';
import { normalize, schema } from 'normalizr';

import * as objectAssign from 'object-assign';

const assessmentSchema = new schema.Entity('assessment');
const assessmentListSchema = new schema.Array(assessmentSchema);

export interface ScoringInterface{
  id: number;
  min: number;
  max: number;
  title: string;
  description: string;
  recommendations: string;
}

export interface ChoicesInterface{
  title: string;
  value: string;
  score: number;
}

export interface QuestionInterface{
  id: number|string;
  title: string;
  type: string;
  choices: ChoicesInterface[];
}

export interface AssessmentInterface{
  id: number;
  title: string;
  maxScore: number;
  minScore: number;
  scoring: ScoringInterface[];
  questions: QuestionInterface[];
  image: string;
  calcQuestions(values: any): QuestionInterface[];
  calcScore(values: any): number;
}

const defaultCalcQuestion = function(values: any){

      return null;
}

const defaultCalcScore = function(values: any){

    function countCompleted (answers) {
      var count = 0;
      var totalCount = 0;
      Object.keys(answers).map(function (v) {
        if (answers[v]) {
          count++;
        }
        totalCount++;
      });
      return {numAnswered: count, total: totalCount};
    }

    function tallyScore (answers, questions) {
      var total = 0;
   
      Object.keys(questions).map(function (idx) {
          let question = questions[idx];

          let choiceValue = answers[question.id];
          let choices = questions[idx].choices;
          console.log(choiceValue);
          console.log(choices);
          if(choices){
            choices.map((choice) => {
              if(choice.value === choiceValue){
                total += parseInt(choice.score);
              }
            });
          }
      });

      return total;
    }


    return tallyScore(values,this.questions);
}


export const makeAssessment = (id,title, minScore: number,maxScore: number, scoring: ScoringInterface[], questions: QuestionInterface[], image='',calcQuestions: (any) => any = defaultCalcQuestion, calcScore: (any) => any = defaultCalcScore ):AssessmentInterface => {
  return {
    id,
    title,
    minScore,
    maxScore,
    scoring,
    questions,
    image,
    calcQuestions,
    calcScore
  }
}

export const makeScoring = (id: number,min,max,title,description='',recommendations=''): ScoringInterface => {
  return {
    id,
    min,
    max,
    title,
    description,
    recommendations
  }
}

export const makeQuestion = (id: number|string,title,type='text',choices = []): QuestionInterface => {
  return {
    id,
    title,
    type,
    choices
  }
}


const PostTraumaticStressList: ScoringInterface[] = [];


const PostTraumaticStressScoring0 = makeScoring(1,0,33,'LOW',
                                    `<p>Your score reflects that you are not experiencing symptoms that are typically associated with post-traumatic stress.</p><p>Although only a healthcare professional can provide an actual diagnosis of post-traumatic stress, or its absence, your results suggest that your experience is not similar to the experience of individuals suffering from post-traumatic stress.</p>`,
                                    `<p>Your results suggest you are managing this area of your life.  Because maintaining healthy habits means a lifestyle that includes stress management and finding balance, we encourage you to check out the many tools in the “Life Stress” program.</p><p>You may find it helpful to join the <a href="https://www.facebook.com/afterdeployment/timeline">AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p><p>You’re also encouraged to check out other assessments on AfterDeployment as they can be helpful for learning more about whether or not you are having problems in other areas.  For your convenience, you can find links to the tools that were mentioned here through the RESOURCES tab located above.</p>`
                                    );



const PostTraumaticStressScoring1 = makeScoring(2,34,43,'MOD',
                                    `<p>Although only a healthcare professional can provide an actual diagnosis, you are reporting some experiences which are similar to some moderate symptoms  associated with Post-traumatic stress.</p>`,
                                    `<p>Having experiences that are somewhat similar to those associated with post-traumatic stress doesn’t mean you have post-traumatic stress disorder (PTSD).  It does mean that you should look into the concerns you are reporting because they can be upsetting and distressing.  If you’ve experienced these symptoms for more than a few weeks, or they are getting worse, you should consult your health care provider.  If you don’t have one, you can locate a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner of the website.   If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the website. Both the CALL and CHAT options are available 24-7.</p><p>Another way to explore these experiences is to check out the materials in AfterDeployment’s “Post-Traumatic Stress” topic. When someone is experiencing the kinds of distressing symptoms you report, problems are often present in other areas of life. You can determine where other problems may exist or the extent of the problem by taking additional assessments.  </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href="https://www.facebook.com/afterdeployment/timeline">AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const PostTraumaticStressScoring2 = makeScoring(3,44,85,'HIGH',
                                    `<p>Although only a healthcare professional can provide an actual diagnosis, your score indicates that you are experiencing a significant number of symptoms that are similar to those associated with post-traumatic stress.</p>`,
                                    `<p>Having experiences that are very similar to those associated with post-traumatic stress suggests that you should look into these concerns because they can be very upsetting and disruptive of your life.   If you’ve experienced these symptoms for more than a few weeks, or they are getting worse, you should consult your health care provider immediately.  If you don’t have one, you can locate a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner of the main page. We recommend you take a copy of the results of this assessment and share them during your appointment.</p><p>If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the main page.  Both the CALL and CHAT options are available 24-7.</p><p>We encourage you to check out the materials in AfterDeployment’s “Post-Traumatic Stress” topic. Also, when someone is experiencing the kinds of distressing symptoms you report, problems are often present in other areas of life.  You can determine where other problems may exist or the extent of the problem by taking additional assessments. </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href="https://www.facebook.com/afterdeployment/timeline">AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );


const DepressionList: ScoringInterface[] = [];


const DepressionScoring3 = makeScoring(4,0,4,'LOW',
                                    `<p>Although only a healthcare professional can provide an actual diagnosis, your score is in a range not typically associated with depression or mood problems. </p>`,
                                    `<p>Your results suggest you are managing this area of your life. Because maintaining healthy habits means a lifestyle that includes stress management and finding balance, we encourage you to check out the many tools in the “Life Stress” topic.</p><p>You're also encouraged to check out other assessments on AfterDeployment to learn if you are having problems in other areas.  You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href="https://www.facebook.com/afterdeployment/timeline">AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const DepressionScoring4 = makeScoring(5,5,15,'MOD',
                                    `<p>Although only a healthcare professional can provide an actual diagnosis, your score is in a range not typically associated with depression or mood problems. However you have indicated that you have had thoughts of hurting yourself in the last month. Please review your answers to determine if they accurately reflect your mood. </p><p><strong>IF YOU ARE HAVING THOUGHTS OF SELF HARM SEEK HELP IMMEDIATELY.</strong> </p>`,
                                    `<p>You have indicated that you have recently had thoughts of harming yourself. Please review your answers to determine if they accurately reflect your mood. </p>  <p><strong>IF YOU ARE HAVING THOUGHTS OF SELF HARM SEEK HELP IMMEDIATELY.</strong></p> <p>If you would like to speak with someone, you can locate a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner of the website. If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the website. Both the CALL and CHAT options are available 24-7.</p><p>Because maintaining healthy habits means a lifestyle that includes stress management and finding balance, we encourage you to check out the many tools in the “Life Stress” topic.</p><p>You're also encouraged to check out other assessments on AfterDeployment to learn if you are having problems in other areas.  You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href="https://www.facebook.com/afterdeployment/timeline">AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const DepressionScoring5 = makeScoring(6,16,27,'HIGH',
                                    `<p>Although only a healthcare professional can provide an actual diagnosis, your score is in a range typically associated with mild or moderate depression. </p>`,
                                    `<p>After a deployment, service members often report brief periods of feeling down, having low energy, or losing interest in things they used to enjoy. Depression is a problem that you can do something about. We encourage you to check out the materials in AfterDeployment’s "Depression" topic.  In addition to the materials on AfterDeployment, you may benefit from discussing your mood problem with a health care provider. If your mood problem lasts several weeks to a few months, or if you believe that your depression is getting worse, contact a healthcare provider and share the results of this assessment. If you don’t have a provider, you can locate a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner of the website.  If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the website. Both the CALL and CHAT options are available 24-7.</p><p>Another way to explore these experiences is to check out the materials in AfterDeployment’s “Depression” topic. When someone is experiencing the kinds of distressing concerns you report, problems are often present in other areas of life. You can determine where other problems may exist or the extent of the problem by taking additional assessments.  </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href="https://www.facebook.com/afterdeployment/timeline">AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );


const AlcoholDrugsList: ScoringInterface[] = [];


const AlcoholDrugsScoring9 = makeScoring(10,0,14,'LOW',
                                    `<p>Your score is in a range typically associated with no or low alcohol or drug use. </p> <p>Although only a healthcare professional can diagnose a substance abuse problem, your results suggest that your health may not be at risk from alcohol or drug use.</p>`,
                                    `<p>Your results suggest you are managing this area of your life. Because maintaining healthy habits means a lifestyle that includes stress management and finding balance, we encourage you to check out the many tools in the “Life Stress” topic. </p> <p> It’s important to emphasize that the abuse of any drug – whether prescribed, over-the-counter, or illegal substances – can lead to health, legal, and relationship problems.</p>  <p>You're also encouraged to check out other assessments on AfterDeployment to learn if you are having problems in other areas.  You can find links to these tools under the RESOURCES tab located above. </p> <p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const AlcoholDrugsScoring10 = makeScoring(11,15,29,'MOD',
                                    `<p>Your score is in a range typically associated with <u>moderate</u> alcohol use.</p> <p>Although only a healthcare professional can diagnose a substance abuse problem, your results suggest that your health may not be at risk from alcohol or drug use.</p>`,
                                    `<p>After a stressful experience, some people turn to drinking to mask painful feelings. But drinking neither solves problems nor fixes painful emotions. In fact, just the opposite is true.  Drinking is much more likely to <u>worsen</u> rather than improve your level of stress.  Out-of-control drinking can often be accompanied by depression, life stress, and even post-traumatic stress, the reaction that many people experience after a major trauma. One easy way to determine if you're having problems in other areas is to take additional assessments.</p><p>We also encourage you to check out the materials in AfterDeployment's "Alcohol and drugs" topic.</p><p>You may benefit from discussing your alcohol use with a health care provider.  You can <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab tab in the upper right corner of the website. We suggest that you share the results of this assessment with your provider. If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the website.  Both the CALL and CHAT options are available 24/7.  For your convenience, you can find links to the all of the tools that were mentioned here through the RESOURCES tab <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tabd above. </p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const AlcoholDrugsScoring11 = makeScoring(12,30,40,'HIGH',
                                    `<p>Your score is in a range typically associated with <u>high</u> levels of alcohol use.</p> <p>Although only a healthcare professional can diagnose a substance abuse problem, your responses are consistent with someone who has become dependent on alcohol, indicating that you’re at high risk for severe problems, including health, social, financial, legal, and relationship difficulties.</p>`,
                                    `<p>After a stressful experience, some people turn to drinking to mask painful feelings. But drinking neither solves problems nor fixes painful emotions. In fact, just the opposite: drinking is much more likely to worsen your stress.   Because your level of use suggests that you have become dependent on alcohol, you should not attempt to quit or decrease your alcohol use on your own.  Suddenly discontinuing heavy alcohol use can be dangerous.  Because you’re reporting significant alcohol use, we recommend that you seek face-to-face care with a professional.  A medical or mental health provider can evaluate the extent of the problem and develop a plan. Take a copy of your assessment results with you. You can <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab tab in the upper right corner of the main page. If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the main page. Both the CALL and CHAT options are available 24/7.</p>  <p>Out-of-control drinking can be accompanied by depression, life stress, and even post-traumatic stress, the reaction that many people experience after a major trauma. A good way to determine if you’re having problems in these other areas is to take additional assessments. We also suggest that you complete the alcohol and drug assessment again in three months and compare your assessment results with today’s results.</p>  <p>We encourage you to check out the materials in AfterDeployment's "Alcohol and Drugs" topic. However, we want to emphasize that your responses  indicate that your best plan is to consult with a health care provider. AfterDeployment is not a substitute for consulting with a provider in person.</p> <p>You can find links to these tools under the RESOURCES tab <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tabd above.</p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );


const AnxietyList: ScoringInterface[] = [];


const AnxietyScoring16 = makeScoring(17,0,5,'LOW',
                                    `<p>Your score is in a range typically associated with a low level of anxiety indicating that anxiety is probably not affecting your life.</p><p>Although only a healthcare professional can provide an actual diagnosis of an anxiety disorder, your results suggest that you are not experiencing the classic physical or cognitive symptoms associated with anxiety.</p>`,
                                    `<p> Your results suggest you are managing this area of your life. Because maintaining healthy habits means a lifestyle that includes stress management and finding balance, we encourage you to check out the many tools in the “Life Stress”   topic.</p><p>You may find it helpful to join the <a href="https://www.facebook.com/afterdeployment/timeline">AfterDeployment Facebook</a> page where you can network with others on a range of topics.  </p><p>You're also encouraged to check out other assessments on AfterDeployment to learn if you are having problems in other areas.  You can find links to these tools under the RESOURCES tab located above.</p>`
                                    );



const AnxietyScoring17 = makeScoring(18,6,10,'MOD',
                                    `<p>Your score is in a range typically associated with  moderate levels of the physical and cognitive symptoms of anxiety.  Although only a healthcare professional can provide an actual diagnosis, your responses suggest that the symptoms you describe may be associated with the changes that occur in the body in response to anxious concerns.</p>`,
                                    `<p>A moderate degree of anxiety typically doesn’t cause significant distress but is a sign to begin to pay attention to your level of worry.  Worry causes an increase in the level of vigilance and physical arousal, energy that could be better used focusing on positive things in life.  If your anxiety symptoms have increased recently  it may be useful to discuss this with your  health care provider.   You can locate a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner on the main page.   If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner on the main page. Both the CALL and CHAT options are available 24/7.</p><p>When someone is worrying unnecessarily, problems are often present in other areas of life. You can determine where other problems may exist or the extent of the problem by taking additional assessments. </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const AnxietyScoring18 = makeScoring(19,11,21,'HIGH',
                                    `<p>Your score is in a range typically associated with a significant level of physical and cognitive symptoms of anxiety.</p><p>Although only a healthcare professional can provide an actual diagnosis, these symptoms may be causing you significant distress.</p>`,
                                    `<p>The physical symptoms of anxiety are frequently experienced during deployment because of the need for a constant level of vigilance.  But high levels of anxiety that persist after deployment, when high vigilance is not required,  can be harmful to your physical health, and your emotional well-being. The cognitive and physical symptoms you are reporting  are frequently associated with high levels of anxiety, but they may also indicate a physical illness.   We urge you to seek face-to-face care with a healthcare provider.If you don’t have a provider, you can locate a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner of the main page. We recommend you take a copy of the results of this assessment and share them during your appointment.</p><p>If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the main page.  Both the CALL and CHAT options are available 24/7.</p><p>We encourage you to check out the materials in AfterDeployment’s “Anxiety” topic. Also, when someone is experiencing multiple symptoms of anxiety, problems are often present in other areas of life.  You can determine where other problems may exist or the extent of the problem by taking additional assessments. </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );


const SleepList: ScoringInterface[] = [];


const SleepScoring19 = makeScoring(20,59,59,'LOW',
                                    `<p>Your responses suggest that you are not having problems with your sleep. Good sleep patterns are important for your health, mood, and productivity. </p>`,
                                    `<p>Your results suggest you are managing this area of your life. Because maintaining healthy habits means a lifestyle that includes stress management and finding balance, we encourage you to check out the many tools in the “Life Stress” topic.</p><p>You may find it helpful to join the <a href="https://www.facebook.com/afterdeployment/timeline">AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p><p>You're also encouraged to check out other assessments on AfterDeployment to learn if you are having problems in other areas.  You can find links to these tools under the RESOURCES tab located above.</p>`
                                    );



const SleepScoring20 = makeScoring(21,60,60,'MOD',
                                    `<p>Your responses suggest that you are having some difficulty with sleeping and that your sleep is not as good as you’d like. </p>  <p>You report having one or two sleep problems and depending on how severe these problems are, you may be having significant difficulties with your functioning. Sleep problems need to be taken seriously. Good sleep patterns are important for your health, mood, and productivity. </p>`,
                                    `<p>We encourage you to check out the resources in the Sleep program on AfterDeployment to find out more about these problems and what you can do about them. You will find information and activities on how to manage issues with sleep and develop healthy sleep patterns. And, we would recommend that you retake this sleep assessment in 2-4 weeks to track how you are doing. We want to emphasize that while this website is here to provide information and support, AfterDeployment is not a substitute for consulting with a health care provider in person.  If you don’t have a provider, you can locate a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner on the main page.  If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner on the main page. Both the CALL and CHAT options are available 24-7.</p><p>Another way to explore these experiences is to check out the materials in AfterDeployment’s “Sleep” topic. When someone is struggling with difficulty sleeping, problems are often present in other areas of life. You can determine where other problems may exist or the extent of the problem by taking additional assessments.  </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const SleepScoring21 = makeScoring(22,61,61,'HIGH',
                                    `<p>Your score is in a range typically associated with significant sleep problems.</p>  <p>Sleep problems need to be taken seriously as chronic sleep problems are bad for your physical and emotional health, your relationships, and your productivity.</p>`,
                                    `<p>A variety of physical health problems may be related to sleep difficulty. Sleep problems may be related to problems such as stress, depression, post traumatic stress and substance abuse. Because you are reporting significant sleep problems, we recommend that you seek face-to-face care with a healthcare provider. A medical or mental health provider can evaluate what is going on and help develop a plan to address your sleep problems. If you don’t have a provider, you can locate a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner of the main page. We recommend you take a copy of the results of this assessment and share them during your appointment.</p><p>If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the main page.  Both the CALL and CHAT options are available 24-7.</p><p>We encourage you to check out the materials in AfterDeployment’s “Sleep” topic. Also, when someone is experiencing the kinds of sleep concerns you report, problems are often present in other areas of life.  You can determine where other problems may exist or the extent of the problem by taking additional assessments.  </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href="https://www.facebook.com/afterdeployment/timeline">AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );


const PanicList: ScoringInterface[] = [];


const PanicScoring22 = makeScoring(23,0,20,'LOW',
                                    `<p>Your score is in a range NOT typically associated with the classic symptoms of panic attacks.</p>  <p>Although only a healthcare professional can provide an actual diagnosis of panic disorder, your results suggest that you are not experiencing the kinds of physical symptoms that usually define a significant problem with panic attacks.</p>`,
                                    `<p>Your results suggest you are managing this area of your life. Because maintaining healthy habits means following a lifestyle that includes stress management and finding balance, we encourage you to check out the many tools in the “Life Stress” topic.</p><p>You're also encouraged to check out other assessments on AfterDeployment to learn if you are having problems in other areas.  You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const PanicScoring23 = makeScoring(24,21,40,'MOD',
                                    `<p>Your score is in a range typically associated with  moderate levels of the physical symptoms associated with panic attacks.  Although only a healthcare professional can provide an actual diagnosis, you report some, but not all of the symptoms of actual panic disorder. </p>`,
                                    `<p>A moderate number of panic symptoms typically doesn’t cause significant, long term distress but is a sign to pay attention to how many demands you are juggling.  High stress levels cause  an increase in the level of vigilance and physical arousal.  If you’ve experienced an increase in these physical symptoms recently,   it may be useful to discuss this with your  health care provider. If you don’t have a provider, you can locate a provider or clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner of the website.  If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the website. Both the CALL and CHAT options are available 24-7.</p><p>When someone is experiencing stress related symptoms,  problems are often present in other areas of life. You can determine where other problems may exist or the extent of the problem by taking additional assessments.</p><p>We also encourage you to check out the materials in AfterDeployment's "Anxiety" topic. </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const PanicScoring24 = makeScoring(25,41,60,'HIGH',
                                    `<p>Your score is in a range typically associated with a significant level of physical symptoms associated with Panic Disorder.</p>  <p>Although only a healthcare professional can provide an actual diagnosis, these symptoms are probably causing you significant distress. </p>`,
                                    `<p>The physical symptoms of panic are frequently experienced during deployment when there is immediate danger and they are completely normal under those circumstances.   But high levels of panic symptoms that seem to come “out of the blue”, when there is no physical danger to confront,  can be frightening and upsetting. The cognitive and physical symptoms you are reporting  are frequently associated with high levels of chronic demands and life stress, but they may also indicate a physical illness.   We urge you to seek face-to-face care with a healthcare provider. If you don’t have a provider, you can locate a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner of the main page. We recommend you take a copy of the results of this assessment and share them during your appointment.</p><p>If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the main page.  Both the CALL and CHAT options are available 24-7.</p><p>When someone is experiencing symptoms of panic disorder,  problems are often present in other areas of life. You can determine where other problems may exist or the extent of the problem by taking additional assessments. We also encourage you to check out the materials in AfterDeployment's "Anxiety" topic. </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );


const PhysicalInjuryResilienceList: ScoringInterface[] = [];


const PhysicalInjuryResilienceScoring25 = makeScoring(26,0,49,'LOW',
                                    `<p>Your results indicate that you are not using many of the skills that could allow you to be more resilient in the face of the challenges that come with being injured.</p>`,
                                    `<p>The stress of coping with a physical injury can be significant.  You have indicated that you are not using many of the skills that can increase personal resilience in the face of an injury.  Your score suggests that there is a great deal more you can do in this area, by adding to your coping strategies or by using them more consistently.</p><p>If you’d like personal help in adding to your coping skills, you can locate a provider or a clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner of the main page. We recommend you take a copy of the results of this assessment and share them during your appointment.</p><p>If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the main page.  Both the CALL and CHAT options are available 24-7.</p><p>When people are coping with the results of a physical injury, there are often problems present in other areas of life.  You can do more exploration by taking additional assessments. We also encourage you to check out the materials in AfterDeployment’s "Physical Injury" topic.  </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const PhysicalInjuryResilienceScoring26 = makeScoring(27,50,70,'MOD',
                                    `<p>Your results indicate that you are using many of the skills that allow you to be resilient in the face of the challenges that come with being injured, but there may be additional skills you could develop to become even more resilient.</p>`,
                                    `<p>The stress of coping with a physical injury can be significant.  You have indicated that you are using several of the skills that can increase personal resilience in the face of an injury.  Your score suggests that there may be more you can do in this area, by adding to your coping strategies or by using them more consistently.</p><p>If you’d like personal help in adding to your coping skills, you can locate a provider or clinic near you by clicking on the <a href='http://afterdeployment.dcoe.mil/locate-help'>LOCATE</a> tab in the upper right corner of the website.  If you have more immediate concerns, you can talk with a professional right now by clicking on the <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=2#qt-quick_tab_header'>CALL</a> or <a href='http://afterdeployment.dcoe.mil/home?qt-quick_tab_header=1#qt-quick_tab_header'>CHAT</a> tabs, also found in the upper right corner of the website. Both the CALL and CHAT options are available 24-7.</p><p>When people are coping with the results of a physical injury, there are often problems present in other areas of life.  You can do more exploration by taking additional assessments.  We also encourage you to check out the materials in AfterDeployment’s "Physical Injury" topic.  </p><p>You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );



const PhysicalInjuryResilienceScoring27 = makeScoring(28,71,88,'HIGH',
                                    `<p>Your results indicate that you are using many of the skills that allow you to be resilient in coping with the stress that comes with being injured.</p>`,
                                    `<p>Your results suggest you are managing this area of your life. Because maintaining healthy habits means following a lifestyle that includes stress management and finding balance, we encourage you to check out the many tools in the “Life Stress” topic.</p><p>You're also encouraged to check out other assessments on AfterDeployment to learn if you are having problems in other areas.  You can find links to these tools under the RESOURCES tab located above.</p><p> You may find it helpful to join the <a href='https://www.facebook.com/afterdeployment/timeline'>AfterDeployment Facebook</a> page where you can network with others on a range of topics. </p>`
                                    );


PostTraumaticStressList.push(PostTraumaticStressScoring0);
PostTraumaticStressList.push(PostTraumaticStressScoring1);
PostTraumaticStressList.push(PostTraumaticStressScoring2);
DepressionList.push(DepressionScoring3);
DepressionList.push(DepressionScoring4);
DepressionList.push(DepressionScoring5);
AlcoholDrugsList.push(AlcoholDrugsScoring9);
AlcoholDrugsList.push(AlcoholDrugsScoring10);
AlcoholDrugsList.push(AlcoholDrugsScoring11);
AnxietyList.push(AnxietyScoring16);
AnxietyList.push(AnxietyScoring17);
AnxietyList.push(AnxietyScoring18);
SleepList.push(SleepScoring19);
SleepList.push(SleepScoring20);
SleepList.push(SleepScoring21);
PanicList.push(PanicScoring22);
PanicList.push(PanicScoring23);
PanicList.push(PanicScoring24);
PhysicalInjuryResilienceList.push(PhysicalInjuryResilienceScoring25);
PhysicalInjuryResilienceList.push(PhysicalInjuryResilienceScoring26);
PhysicalInjuryResilienceList.push(PhysicalInjuryResilienceScoring27);




const choicesSet1: ChoicesInterface[] = [
      {title: '0 - Not at all', value: '1', score: 0},
      {title: '1', value: '2', score: 1},
      {title: '2', value: '3', score: 2},
      {title: '3', value: '4', score: 3},
      {title: '4', value: '5', score: 4},
      {title: '5', value: '6', score: 5},
      {title: '6', value: '7', score: 6},
      {title: '7', value: '8', score: 7},
      {title: '8 - Exactly So', value: '9', score: 8}
];

const choicesSet2: ChoicesInterface[] = [
      {title: 'Almost Always', value: '1', score: 4},
      {title: 'Most of the time', value: '2', score: 3},
      {title: 'About half the time', value: '3', score: 2},
      {title: 'Occasionally', value: '4', score: 1},
      {title: 'Not at all', value: '5', score: 0},
];

const choicesSet3: ChoicesInterface[] = [
      {title: 'Almost Always', value: '1', score: 0},
      {title: 'Most of the time', value: '2', score: 1},
      {title: 'About half the time', value: '3', score: 2},
      {title: 'Occasionally', value: '4', score: 3},
      {title: 'Not at all', value: '5', score: 4},
];

const choicesSet4: ChoicesInterface[] = [
      {title: 'Very Unhappy', value: '1', score: 0},
      {title: 'Somewhat Unhappy', value: '2', score: 2},
      {title: 'Slightly Unhappy', value: '3', score: 7},
      {title: 'Happy', value: '4', score: 15},
      {title: 'Pretty Happy', value: '5', score: 20},
      {title: 'Very Happy', value: '6', score: 25},
      {title: 'Perfectly Happy', value: '7', score: 35},
];

const choicesSet5: ChoicesInterface[] = [
      {title: 'Always Agree', value: '1', score: 5},
      {title: 'Almost Always Agree', value: '2', score: 4},
      {title: 'Occasionally Disagree', value: '3', score: 3},
      {title: 'Frequently Disagree', value: '4', score: 2},
      {title: 'Almost Always Disagree', value: '5', score: 1},
      {title: 'Always Disagree', value: '6', score: 0},
];

const choicesSet6: ChoicesInterface[] = [
      {title: 'Always Agree', value: '1', score: 8},
      {title: 'Almost Always Agree', value: '2', score: 6},
      {title: 'Occasionally Disagree', value: '3', score: 4},
      {title: 'Frequently Disagree', value: '4', score: 2},
      {title: 'Almost Always Disagree', value: '5', score: 1},
      {title: 'Always Disagree', value: '6', score: 0},
];

const choicesSet7: ChoicesInterface[] = [
      {title: 'Always Agree', value: '1', score: 15},
      {title: 'Almost Always Agree', value: '2', score: 12},
      {title: 'Occasionally Disagree', value: '3', score: 9},
      {title: 'Frequently Disagree', value: '4', score: 4},
      {title: 'Almost Always Disagree', value: '5', score: 1},
      {title: 'Always Disagree', value: '6', score: 0},
];

const choicesSet8: ChoicesInterface[] = [
      {title: 'Strongly disagree', value: '1', score: 5},
      {title: 'Disagree', value: '2', score: 4},
      {title: 'Neither agree nor disagree', value: '3', score: 3},
      {title: 'Agree', value: '4', score: 2},
      {title: 'Strongly agree', value: '5', score: 1}
];

const choicesSet9: ChoicesInterface[] = [
      {title: 'Strongly disagree', value: '1', score: 1},
      {title: 'Disagree', value: '2', score: 2},
      {title: 'Neither agree nor disagree', value: '3', score: 3},
      {title: 'Agree', value: '4', score: 4},
      {title: 'Strongly agree', value: '5', score: 5}
];

const choicesSet10: ChoicesInterface[] = [
      {title: 'Mother', value: '1', score: 0},
      {title: 'Father', value: '2', score: 0},
      {title: 'Other', value: '3', score: 0}
];

const choicesSet11: ChoicesInterface[] = [
      {title: 'Strongly Agree', value: '1', score: 1},
      {title: 'Agree', value: '2', score: 2},
      {title: 'Mildly Agree', value: '3', score: 3},
      {title: 'Mildly Disagree', value: '4', score: 4},
      {title: 'Disagree', value: '5', score: 5},
      {title: 'Strongly Disagree', value: '6', score: 6}
];

const choicesSet12: ChoicesInterface[] = [
      {title: 'Strongly Agree', value: '1', score: 6},
      {title: 'Agree', value: '2', score: 5},
      {title: 'Mildly Agree', value: '3', score: 4},
      {title: 'Mildly Disagree', value: '4', score: 3},
      {title: 'Disagree', value: '5', score: 2},
      {title: 'Strongly Disagree', value: '6', score: 1}
];

const choicesSet13: ChoicesInterface[] = [
      {title: 'husband giving in', value: '1', score: 0},
      {title: 'wife giving in', value: '2', score: 2},
      {title: 'agreement by mutual give and take', value: '3', score: 10},
];
const choicesSet14: ChoicesInterface[] = [
      {title: 'All of them', value: '1', score: 10},
      {title: 'Some of them', value: '2', score: 8},
      {title: 'Very few of them', value: '3', score: 3},
      {title: 'None of them', value: '4', score: 0}
];

const choicesSet15: ChoicesInterface[] = [
      {title: 'to both be "On the go" ', value: '1', score: 3},
      {title: 'to both be stay at home ', value: '2', score: 10},
      {title: 'neither', value: '3', score: 2}
];

const choicesSet16: ChoicesInterface[] = [
      {title: 'Frequently', value: '1', score: 0},
      {title: 'Occasionally', value: '2', score: 3},
      {title: 'Rarely', value: '3', score: 8},
      {title: 'Never', value: '4', score: 15}
];

const choicesSet17: ChoicesInterface[] = [
      {title: 'Marry the same person', value: '1', score: 15},
      {title: 'Marry a different person', value: '2', score: 0},
      {title: 'Not marry at all', value: '3', score: 1}
];

const choicesSet18: ChoicesInterface[] = [
      {title: 'almost never', value: '1', score: 0},
      {title: 'rarely', value: '2', score: 2},
      {title: 'in most things', value: '3', score: 10},
      {title: 'in everything', value: '4', score: 10}
];

const choicesSet19: ChoicesInterface[] = [
      {title: 'No', value: '1', score: 0},
      {title: 'Yes', value: '2', score: 1}
];

const choicesSet20: ChoicesInterface[] = [
      {title: 'Never', value: '1', score: 0},
      {title: 'Once or Twice', value: '2', score: 2},
      {title: 'Monthly', value: '3', score: 3},
      {title: 'Weekly', value: '4', score: 4},
      {title: 'Daily or almost daily', value: '5', score: 6},
];

const choicesSet21: ChoicesInterface[] = [
      {title: 'Never', value: '1', score: 0},
      {title: 'Once or Twice', value: '2', score: 3},
      {title: 'Monthly', value: '3', score: 4},
      {title: 'Weekly', value: '4', score: 5},
      {title: 'Daily or almost daily', value: '5', score: 6},
];
const choicesSet22: ChoicesInterface[] = [
      {title: 'Never', value: '1', score: 0},
      {title: 'Once or Twice', value: '2', score: 5},
      {title: 'Monthly', value: '3', score: 6},
      {title: 'Weekly', value: '4', score: 7},
      {title: 'Daily or almost daily', value: '5', score: 8},
];

const choicesSet23: ChoicesInterface[] = [
      {title: 'No, Never', value: '1', score: 0},
      {title: 'Yes, in the past 3 months', value: '2', score: 6},
      {title: 'Yes, but not in the past 3 months', value: '3', score: 3}
];

const choicesSet24: ChoicesInterface[] = [
  {title: 'Not at all', value: '1', score: 1},
  {title: 'A little bit', value: '2', score: 2},
  {title: 'Moderately', value: '3', score: 3},
  {title: 'Quite a bit', value: '4', score: 4},
  {title: 'Extremely', value: '5', score: 5},   
];

const getQuestionScore = (value,choices) => {
  return choices.reduce((score,choice) => {
                            if(choice.value === value){
                              score += choice.score;
                            }
                            return score;
                          },0);
}
const makeIdHashMap = (items: {id:string}[]) => {
  return items.reduce((map,q) => {
                          map[q.id] = q;
                          return map;
                        },{})
}

const getSubstanceScore = (substanceQuestions,values,questionsMap) => {
  return substanceQuestions.reduce((tally, qId) => {
    const value = typeof values[qId] !== 'undefined' ? values[qId] : null;
    if(value && typeof questionsMap[qId] !== 'undefined'){
      const choices = questionsMap[qId].choices;
      tally += getQuestionScore(value,choices);
    }
    return tally;
  },0);
}
const returnInRange = (numbers: number[], min: number, max: number) => {
  return numbers.filter((number) => {
    return number >= min && number <= max;
  });
}
const calcDrugsScore = function(values: any){
  var allSubstances = ['2','3','4','5','6'];
  const alcQuestions = ['2','7_2','8_2','9_2','10_2']; 
  const potQuestions = ['3','7_3','8_3','9_3','10_3']; 
  const cokeQuestions = ['4','7_4','8_4','9_4','10_4']; 
  const amphQuestions = ['5','7_5','8_5','9_5','10_5']; 
  const sedQuestions = ['6','7_6','8_6','9_6','10_6'];
  const substancesUsed = ['2','3','4','5','6'];
  
  const questionsMap = makeIdHashMap(this.calcQuestions(values));

  var chosenSubstances = []; //question1 chosen substances
  let alcChosen = false;

  allSubstances.map(qId => {
     if(typeof values[qId] !== 'undefined' && values[qId] === '2'){
       chosenSubstances.push(qId);
       if(qId === '2'){
         alcChosen = true;
       }
     }
  });
  const noneChosen = chosenSubstances.length === 0;
  const onlyAlc = chosenSubstances.length === 1 && alcChosen;
  
  let alcScore  = getSubstanceScore(alcQuestions,values,questionsMap);
  let potScore = getSubstanceScore(potQuestions,values,questionsMap);
  let cokeScore = getSubstanceScore(cokeQuestions,values,questionsMap);
  let amphScore = getSubstanceScore(amphQuestions,values,questionsMap);
  let sedScore = getSubstanceScore(sedQuestions,values,questionsMap);
  let scoresArray = [alcScore,potScore,cokeScore,amphScore,sedScore];
  let areAllDrugsLowUsagec = noneChosen;
  if(!areAllDrugsLowUsagec){
     areAllDrugsLowUsagec = alcScore < 4 && potScore < 4 && cokeScore < 4 && amphScore < 4 && sedScore < 4;
  }
 //0 - 14 = low, 15-29= mod, 30 - 40 = high
  const isAnyDrugModerate = returnInRange(scoresArray,4,26).length > 0;
  const isAnyDrugHigh = returnInRange(scoresArray,27,38).length > 0;
  const isLowAlc = (alcScore >= 0 && alcScore < 11);
  const isModAlc = (alcScore >= 11 && alcScore < 27);
  const isHighAlc = (alcScore >= 27 && alcScore < 39);
  if(noneChosen){
     return 0;
  }

  if(!noneChosen && areAllDrugsLowUsagec && !onlyAlc && isLowAlc){
    //Low Alcohol and Drug Acuity
    return 4
  }

  if(!noneChosen && areAllDrugsLowUsagec && !onlyAlc && isModAlc){
    //Moderate Alcohol Acuity
    return 20;
  }

  if(!noneChosen && areAllDrugsLowUsagec && !onlyAlc && isHighAlc){
    //High Alcohol Acuity
    return 30;
  }

  if(isAnyDrugModerate && !isAnyDrugHigh && isLowAlc){
    //Moderate Drug Acuity
    return 25;
  }

  if(isAnyDrugHigh && isLowAlc){
    //High Drug Acuity
    return 35;
  }

  if(isModAlc && isAnyDrugModerate && !isAnyDrugHigh){
    //Moderate Alcohol and Drug Acuity
    return 20;
  }

  if((isHighAlc && (isAnyDrugModerate || isAnyDrugHigh)) || (isAnyDrugHigh && (isModAlc || isHighAlc))){
    //High Alcohol and Drug Acuity
    return 35
  }

  return scoresArray.reduce((tally,score)=>{
    tally + score;
    return tally;
  },0);
}

const calcAlcDrugQuestions = function(values: any){
      var allSubstances = ['1','2','3','4','5','6']; //Logicly these 6 questions "are" question one
      var question2Dependents = ['8','9','10'];
      var chosen = []; //question1 chosen substances
      allSubstances.map(qId => {
         if(typeof values[qId] !== 'undefined' && values[qId] === '2'){
           chosen.push(qId);
         }
      })

      const questionsMap = this.questions.reduce((acc,item) => {
          acc[item.id] = item;
          return acc;
      },{});

      let substanceQuestions = this.questions.filter(q => {
         if(parseInt(q.id) <= 6){
           return true;
         }
         return false;
      });
      
      
      let conditionalQuestions2Labels = this.questions.filter(q => {
         if(chosen.length > 0 && parseInt(q.id) === 7){
           return true;
         }
         return false;
      });

      let conditionalQuestions3Labels = this.questions.filter(q => {
         if(chosen.length > 0 && parseInt(q.id) > 7 && parseInt(q.id) < 11){
           return true;
         }
         return false;
      });
      
      let conditionalQuestions2 = [];
      let condition2chosenSubstances = [];
      if(chosen.length > 0){
        conditionalQuestions2Labels.map((ql) => {
          conditionalQuestions2.push(ql);
          chosen.map((qcId) => {
            var subQuestion = questionsMap[qcId];
            if(subQuestion){
              let questionId = ql.id + '_' + qcId;
              conditionalQuestions2.push(
                makeQuestion(questionId, subQuestion.title, 'select', ql.choices)
              )

              if(typeof values[questionId] !== 'undefined' && values[questionId] !== '1'){
                condition2chosenSubstances.push(subQuestion); 
              }
            }
          });
        })
      }
      let conditionalQuestions3 = [];
      if(condition2chosenSubstances.length > 0){
        conditionalQuestions3Labels.map((ql) => {
          conditionalQuestions3.push(ql);
          condition2chosenSubstances.map((subQuestion) => {
              let questionId = ql.id + '_' + subQuestion.id;
              conditionalQuestions3.push(
                makeQuestion(questionId, subQuestion.title, 'select', ql.choices)
              )
          });
        })
      }

      return substanceQuestions.concat(conditionalQuestions2).concat(conditionalQuestions3);
}

const alcDrugsQuestions: QuestionInterface[] = [
  makeQuestion('1','In your lifetime, which of the following substances have you ever used? (NON-MEDICAL USE ONLY)','label'),
  makeQuestion('2','Alcohol (beer, wine, spirits, etc.)','select',choicesSet19),
  makeQuestion('3','Cannabis (marijuana, pot, grass, hash, etc.)','select',choicesSet19),
  makeQuestion('4','Cocaine (coke, crack, etc.)','select',choicesSet19),
  makeQuestion('5','Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)','select',choicesSet19),
  makeQuestion('6','Sedatives or sleeping pills (Valium, Serapax, Rohypnol, Ambien, etc.)','select',choicesSet19),

  makeQuestion('7','In the past three months, how often have you used each of the following substances? (NON-MEDICAL USE ONLY)','label',choicesSet20),
  makeQuestion('8','During the past three months, how often have you had a strong desire or urge to use [substance]?','label', choicesSet21),
  makeQuestion('9','During the past three months, how often has your use of [substance] led to health, social, legal, or financial problems?','label', choicesSet20),
  makeQuestion('10','During the past three months, how often have you failed to do what was normally expected of you because of your use of [substance]?','label', choicesSet22),
  makeQuestion('11','Has a friend or anyone else ever expressed concern because of your use of [substance]?','label', choicesSet23),
  makeQuestion('12','Have your ever tried and failed to control, cut down or stop using [substance]?','label', choicesSet23),
];

const ptsQuestions: QuestionInterface[] = [
  makeQuestion('1','Repeated, disturbing memories, thoughts, or images of a stressful military experience from the past?','select',choicesSet24),
  makeQuestion('2','Repeated, disturbing dreams of a stressful military experience from the past?','select',choicesSet24),
  makeQuestion('3','Suddenly acting or feeling as if a stressful military experience were happening again (as if you were reliving it)? ','select',choicesSet24),
  makeQuestion('4','Feeling very upset when something reminded you of a stressful military experience from the past?','select',choicesSet24),
  makeQuestion('5','Having physical reactions (e.g., heart pounding, trouble breathing, or sweating) when something reminded you of a stressful military experience from the past? ','select',choicesSet24),
  makeQuestion('6','Avoiding thinking about or talking about a stressful military experience from the past or avoid having feelings related to it?','select',choicesSet24),
  makeQuestion('7','Avoid activities or situations because they remind you of a stressful military experience from the past? ','select',choicesSet24),
  makeQuestion('8','Trouble remembering important parts of a stressful military experience from the past?','select',choicesSet24),
  makeQuestion('9','Loss of interest in things that you used to enjoy?','select',choicesSet24),
  makeQuestion('10','Feeling distant or cut off from other people? ','select',choicesSet24),
  makeQuestion('11','Feeling emotionally numb or being unable to have loving feelings for those close to you?','select',choicesSet24),
  makeQuestion('12','Feeling as if your future will somehow be cut short? ','select',choicesSet24),
  makeQuestion('13','Trouble falling or staying asleep? ','select',choicesSet24),
  makeQuestion('14','Feeling irritable or having angry outbursts?','select',choicesSet24),
  makeQuestion('15','Having difficulty concentrating?','select',choicesSet24),
  makeQuestion('16','Being "super alert" or watchful on guard?','select',choicesSet24),
  makeQuestion('17','Feeling jumpy or easily startled?','select',choicesSet24),
];

const postDepSupportQuestions: QuestionInterface[] = [
  makeQuestion(1,'The reception I received when I returned from my deployment made me feel appreciated for my efforts.','select',choicesSet9),
  makeQuestion(2,'The American people made me feel at home when I returned.','select',choicesSet9),
  makeQuestion(3,'When I returned, people made me feel proud to have served my country in the armed forces.','select',choicesSet9),

  makeQuestion(4,'I am carefully listened to and understood by family members or friends.','select',choicesSet9),
  makeQuestion(5,'Among my family or relatives, there is someone who makes me feel better when I am feeling down.','select',choicesSet9),
  makeQuestion(6,'I have problems that I can’t discuss with family or friends.','select',choicesSet8),

  makeQuestion(7,'Among my friends or relatives, there is someone I go to when I need good advice.','select',choicesSet9),
  makeQuestion(8,'People at home just don’t understand what I have been through in the armed forces.','select',choicesSet8),
  makeQuestion(9,'There are people to whom I can talk about my deployment experiences.','select',choicesSet9),

  makeQuestion(10,'The people I work with respect the fact that I am a veteran or service member.','select',choicesSet9),
  makeQuestion(11,'My supervisor understands when I need time to take off to take care of personal matters.','select',choicesSet9),
  makeQuestion(12,'My friends or relatives would lend me money if I needed it.','select',choicesSet9),

  makeQuestion(13,'My friends or relatives would help me move my belongings if I needed to.','select',choicesSet9),
  makeQuestion(14,'When I am unable to attend to daily chores, there is someone who will help me with these tasks.','select',choicesSet9),
  makeQuestion(15,'When I am ill, friends or family members will help out until I am well.','select',choicesSet9)
];

const parentingConfidenceAssessment: QuestionInterface[] = [
  makeQuestion(1,'Are you a Mother/Father/Other?','select',choicesSet10),
  makeQuestion(2,'The problems of taking care of a child are easy to solve once you know how your actions affect your child, an understanding I have acquired.','select',choicesSet12),
  makeQuestion(3,'Even though being a parent could be rewarding, I am frustrated now while my child is at his/her present age.','select',choicesSet11),
  makeQuestion(4,'I go to bed the same way I wake up in the morning—feeling I have not accomplished a whole lot.','select',choicesSet11),
  makeQuestion(5,'I do not know what it is, but sometimes when I’m supposed to be in control, I feel more like the one being manipulated.','select',choicesSet11),
  makeQuestion(6,'My parent was better prepared to be a good parent than I am.','select',choicesSet11),
  makeQuestion(7,'I would make a fine model for a new parent to follow in order to learn what she/he would need to know in order to be a good parent.','select',choicesSet12),
  makeQuestion(8,'Being a parent is manageable, and any problems are easily solved.','select',choicesSet12),
  makeQuestion(9,'A difficult problem in being a parent is not knowing whether you’re doing a good job or a bad one.','select',choicesSet11),
  makeQuestion(10,'Sometimes I feel like I’m not getting anything done.','select',choicesSet11),
  makeQuestion(11,'I meet my own personal expectations for expertise in caring for my child.','select',choicesSet12),
  makeQuestion(12,'If anyone can find the answer to what is troubling my child, I am the one.','select',choicesSet12),
  makeQuestion(13,'My talents and interests are in other areas, not in being a parent.','select',choicesSet11),
  makeQuestion(14,' Considering how long I’ve been a parent, I feel thoroughly familiar with this role.','select',choicesSet12),
  makeQuestion(15,'If being a parent of a child were only more interesting, I would be motivated to do a better job as a parent.','select',choicesSet11),
  makeQuestion(16,' I honestly believe I have all the skills necessary to be a good parent to my child.','select',choicesSet12),
  makeQuestion(17,'Being a parent makes me tense and anxious.','select',choicesSet11),
]

const friendsImage = require('../images/friends-form.png');
const marriageImage  = require('../images/married.jpeg');
const socialImage  = require('../images/Social-Society-Community-Cooperation-Network-1020332.jpg');
const postDepSocialImage = require('../images/post-dep-social.jpg');
const parentingConfidenceImage = require('../images/duck_parenting.jpg');


interface AssessmentTreeInterface {
  [propName: string]: AssessmentInterface;
}

const assessmentsRaw: AssessmentInterface[] = [
  makeAssessment(1,'Alcohol and Drugs', 0, 38, AlcoholDrugsList,alcDrugsQuestions,friendsImage,calcAlcDrugQuestions,calcDrugsScore),
  makeAssessment(2,'Post-Traumatic Stress', 17, 85,PostTraumaticStressList, ptsQuestions, marriageImage),

  //makeAssessment(3,'Depression', 7, 84,DepressionList,percSocialSupportQuestions, socialImage),
  makeAssessment(4,'Anxiety', 0, 21, AnxietyList,postDepSupportQuestions,postDepSocialImage),
  makeAssessment(5,'Panic', 16, 96, PanicList,parentingConfidenceAssessment,parentingConfidenceImage),

  makeAssessment(6,'Physical Injury Resilience', 16, 96, PhysicalInjuryResilienceList,parentingConfidenceAssessment,parentingConfidenceImage),
  makeAssessment(7,'Sleep', 16, 96, SleepList,parentingConfidenceAssessment,parentingConfidenceImage)
]

const normalData = normalize(assessmentsRaw,assessmentListSchema);

export const assessments: AssessmentTreeInterface = normalData.entities.assessment;

export const assessmentIds = normalData.result;




