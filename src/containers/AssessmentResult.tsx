import AssessmentResult from '../components/AssessmentResult';
import {assessments, assessmentIds} from '../res/data/assessments';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';


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
    assessment: assessment,
    middleScore: assessment.middleScore,
    highIsGood: assessment.scoringMode === 1
  }
}
const dispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(stateToProps,dispatchToProps)

(AssessmentResult);