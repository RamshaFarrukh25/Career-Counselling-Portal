import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    offerCounsellorForm:{
        // first Form states
        name: "",
        email: "",
        phoneNo:"",
        gender:"",
        cnic:"",
        cnicFrontImg: "",
        cnicBackImg:"",
        // second Form states
        qualification:"",
        fieldOfStudy:"",
        transcript:"",

        // third Form states
        workingExperience: [
            {
                institute: "",
                startingYear: "",
                endingYear: "",
                certificates: ""
            }
        ]
    },
    stepCount:0,
    errorMsg:"",
    showModel:false
}
const offerCounsellingSlice = createSlice({
    name:'offerCounselling',
    initialState,
    reducers: {
        handleChange: (state,{payload})=>{
            state.offerCounsellorForm= {
                ...state.offerCounsellorForm,
                [payload.name]:payload.value
            }
        },
        handleSubmit: (state) =>{
            // console.log(state.offerCounsellorForm.name)
            // console.log(state.offerCounsellorForm.email)
            // console.log(state.offerCounsellorForm.phoneNo)
            // console.log(state.offerCounsellorForm.cnic)
            // console.log(state.offerCounsellorForm.cnicFrontImg)
            // console.log(state.offerCounsellorForm.cnicBackImg)
            // console.log(state.offerCounsellorForm.gender)
        },
        setCount: (state,{payload})=>{
            state.stepCount= payload.value
        },
        resetCount: (state)=>{
            state.stepCount= 0
        },
        ErrorMsg:(state,{payload})=>{
            console.log(payload.msg)
            state.errorMsg = payload.msg   
        },
        handleFileChange: (state, {payload}) => {
            console.log(payload.name, payload.file.name)
            state.offerCounsellorForm = {
                ...state.offerCounsellorForm,
                [payload.name]:payload.file.name
            }
        },
        handleModelChange:(state)=>{
            state.showModel = !state.showModel
        },
        addWorkingExperience: (state) => {
            return {
              ...state,
              offerCounsellorForm: {
                ...state.offerCounsellorForm,
                workingExperience: [
                  ...state.offerCounsellorForm.workingExperience,
                  {
                    institute: "",
                    startingYear: "",
                    endingYear: "",
                    certificates: ""
                  }
                ]
              }
            };
        },          
        removeWorkingExperience: (state, { payload }) => {
            state.offerCounsellorForm.workingExperience.splice(payload.index, 1)
        },
        updateWorkingExperience: (state, { payload }) => {
            const { index, name, value} = payload;
            state.offerCounsellorForm.workingExperience[index][name] = value;
        },
        updateWorkingExperienceFile: (state, { payload }) => {
            const { index, name,file } = payload;
            state.offerCounsellorForm.workingExperience[index][name] = file.name;
        }           
        
    }

})

export const{handleChange, handleSubmit,setCount,ErrorMsg,
    resetCount,handleFileChange,handleModelChange,addWorkingExperience,
    removeWorkingExperience,updateWorkingExperience,updateWorkingExperienceFile} = offerCounsellingSlice.actions
export default offerCounsellingSlice.reducer