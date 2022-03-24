
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
let clicked= false
const seeBugForm = ()=>{

  const inputFields = document.querySelectorAll('input[type="text"]')
  inputFields.forEach(input=> input.value='')

  const formWrapperDiv =document.querySelector('.form-wrapper')
  const formResult = document.querySelector('.see-form-result')

  axios.get('/features')
  .then((response)=>{
    const featuresData = response.data.features
    console.log('features',featuresData)
    const featuresDiv = document.querySelector('.features-select')
    if (!clicked){
      featuresData.forEach(feature =>{
        const radioEl = document.createElement('input')
        const labelEl = document.createElement('label')
        radioEl.classList.add('radio-input')
        labelEl.innerHTML = feature.name
        console.log(feature.id)
        setAttributes(labelEl,{'for':`feature-${feature.id}`})
        setAttributes(radioEl, {'type':'radio','value':`${feature.id}`,'name':'features','id':`feature-${feature.id}`})

        featuresDiv.appendChild(radioEl)
        featuresDiv.appendChild(labelEl)
        clicked = true
      }
    )}
  })
  .catch(error=>{
    console.log(error)
  })

  formWrapperDiv.style.display= 'block'
  formResult.style.display = 'none'

}

function getSelectedFeature(featureID){
  axios
  .get(`/features/${featureID}`)
  .then((response)=>{
    console.log(response.data.specificFeature.name)
    const selectedFeature = response.data.specificFeature.name
    const featureEl = document.querySelector('#bug-feature')
    featureEl.innerHTML= selectedFeature
  })
  .catch((error)=>{
    console.log(error)
  })
}

function seeAllBugs(){
  axios
  .get('/bugs')
  .then(response=>{
    const bugsData = response.data.bugsList
    const bugsWrapperDiv = document.querySelector('.bugs-wrapper')
    bugsData.forEach(bug =>{
      const bugDiv = document.createElement('div')
      bugDiv.innerHTML = `${bug.id} : ${bug.problem}`
      bugsWrapperDiv.appendChild(bugDiv)
    })
  })
}

function submitBug(){
  const inputProblem = document.getElementById('problem').value
  const inputError = document.getElementById('error').value
  const inputCommit = document.getElementById('commit').value
  const selectedFeatureId = document.querySelector('input[name="features"]:checked').value
  console.log(selectedFeatureId)

  const data = {
    problem: inputProblem,
    errorText: inputError, 
    commit: inputCommit, 
    featureId: selectedFeatureId
  }

  console.log(data)
  JsLoadingOverlay.show();
  axios
  .post('/bugs', data)
  .then((response) => {
    seeAllBugs()
    // handle success
    JsLoadingOverlay.hide();
    const formWrapperDiv =document.querySelector('.form-wrapper')
    const formResult = document.querySelector('.see-form-result')
    formWrapperDiv.style.display= 'none'
    formResult.style.display = 'block'

    const {id,problem,errorText,commit,createdAt} = response.data.bug
    const bugResult = [id,problem,errorText,commit,createdAt]
    
    const divEl = document.querySelectorAll('.bug-post-result')

    for (let i=0; i<bugResult.length; i+=1){
      divEl[i].innerHTML = bugResult[i]
    }
    getSelectedFeature(response.data.bug.featureId)
  })
  .catch((error) => {
    // handle error
    JsLoadingOverlay.hide();
    console.log(error);
  })

}

function seeFeatureForm(){
  const featureFormWrapper = document.querySelector('.feature-form-wrapper')
  featureFormWrapper.style.display = 'block'
  const featureWrapper = document.querySelector('.new-feature-wrapper')
  featureWrapper.style.display = 'none'
}

function submitFeature(){
  const featureFormWrapper = document.querySelector('.feature-form-wrapper')
  featureFormWrapper.style.display = 'block'
  const featureInput = document.querySelector('#name').value
  console.log(featureInput)
  const featureData ={
    featureName: featureInput
  }
  axios.post('/features',featureData)
  .then(response=>{
    const newFeatureAdded = response.data.newFeature
    const featureNameEl = document.querySelector('#featureName')
    const featureDateEl = document.querySelector('#featureDate')

    featureNameEl.innerHTML = newFeatureAdded.name
    featureDateEl.innerHTML = newFeatureAdded.createdAt

    const featureWrapper = document.querySelector('.new-feature-wrapper')
    featureWrapper.style.display = 'block'
    featureFormWrapper.style.display = 'none'
  })
  .catch(error=>{
    console.log(error)
  })
}

// user log in 

const registerUser= ()=>{
  const emailRegister = document.querySelector('#registerEmail').value
  const passwordRegister = document.querySelector('#registerPassword').value

  const registerData = {
    email: emailRegister, 
    password: passwordRegister
  }
  axios.post('/users', registerData)
  .then(response=>{
    const userData = response.data.user
    console.log(userData)
    const registerFields = [document.querySelector('#registerEmail'), document.querySelector('#registerPassword')]
    registerFields.forEach(input => input.value="")
  })
  .catch(error=>{
    console.log(error)
  })
}

const logUser =()=>{
  const inputValues = [document.querySelector('#logEmail').value,document.querySelector('#logPassword').value]

  const userData= {
    email: inputValues[0], 
    password: inputValues[1]
  }

  axios.post('/users/login', userData)
  .then(response =>{
    console.log(document.cookie)
    if (response.data.user){
      const dashboardEl = document.querySelector('.main-dashboard')
      dashboardEl.classList.remove('hide')
      const registrationDiv = document.querySelector('.registration')
      registrationDiv.classList.add('hide')
      seeAllBugs()
    }
  })

}


