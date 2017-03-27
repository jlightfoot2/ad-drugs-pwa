import AssessmentResult from '../components/AssessmentResult';
import {assessments, assessmentIds} from '../res/data/assessments';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';

const computeScore = (assessment,results) => {

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


    return tallyScore(results,assessment.questions);
}

function getDescription(tally, assessment) {

      let score = assessment.scoring.filter(function (criteria) {
        if (criteria.min <= tally && criteria.max >= tally) {
          return true;
        }
        return false;
      })


      return score.length ? score[0] : assessment.scoring[0]
}

const stateToProps = (state,ownProps) => {
 // ownProps.params.id
  let assessment = assessments[ownProps.params.id] ? assessments[ownProps.params.id] : assessments['1'];
  let score = assessment.calcScore(state.assessmentResults[ownProps.params.id]);
  let description = getDescription(score,assessment);
  
  return {
    minScore: assessment.minScore,
    maxScore: assessment.maxScore,
    score: score,
    result: description,
    assessment: assessment
  }
}
const dispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(stateToProps,dispatchToProps)

(AssessmentResult);