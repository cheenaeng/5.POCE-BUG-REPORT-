export default function initBugsController(db) {
  const addbug = async (request, response) => {
    try {

      const bug = await db.Bug.create({
        problem: request.body.problem, 
        errorText : request.body.errorText, 
        commit: request.body.commit, 
        featureId: request.body.featureId, 
        userId: request.cookies.userId
      });
      response.send({ bug });
    } catch (error) {
      console.log(error);
    }
  };

    const seeFeatures = async (request, response) => {
    try {
      const features = await db.Feature.findAll()

      response.send({ features });
    } catch (error) {
      console.log(error);
    }
  };

  const getSpecificFeature = async(request,response)=>{
    try{
      const {featureID} = request.params
      const specificFeature = await db.Feature.findOne({
        where:{
          id: featureID
        }
      })
      response.send({specificFeature})

    }
    catch(error){
      console.log(error)
    }
  }

  const showAllBugs = async(request,response)=>{
    try{
      const bugsList = await db.Bug.findAll({
        where: {
          userId: request.cookies.userId
        }
      })
      console.log('bugs', bugsList)
      response.send({bugsList})

    }
    catch(error){
      console.log(error)
    }
  }

  const postFeature =async(request,response)=>{
    try{
      const {featureName} = request.body
      console.log(featureName)

      const newFeature = await db.Feature.create({
        name: featureName
      })

      response.send({newFeature})
    }
    catch(error){
      console.log(error)
    }
  }

  return {
    addbug, seeFeatures,getSpecificFeature, showAllBugs,postFeature
  };
}