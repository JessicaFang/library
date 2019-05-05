import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Main/Login'
import Register from '@/views/Main/Register'
import Reset from '@/views/Main/Reset'
import Teacher from '@/views/Teacher'
import TeacherCourse from '@/views/Teacher/Course'
import TeacherAddPaper from '@/views/Teacher/Course/AddPaper'
import TeacherChargePaper from '@/views/Teacher/Course/ChargePaper'
import TeacherEditPaper from '@/components/AlterQuestion'
import TeacherSuggestLib from '@/views/Teacher/SuggestLib';
import ChargeStudentPaper from '@/views/Teacher/SuggestLib/ChargeStudentPaper'
import TeacherExam from '@/components/Exam'
import TeacherMessage from '@/views/Teacher/Message'
import TeacherStatics from '@/views/Teacher/Statics'
import TeacherEcharts from '@/views/Teacher/Statics/echart'
import Student from  '@/views/Student'
import StudentMessage from  '@/views/Student/Message'
import ChoiceTest from '@/views/Student/ChoiceTest'
import StudentExaming from '@/components/Exam/stuExaming'
import ChargeTest from '@/views/Student/ChargeTest'
import StudentExam from '@/components/Exam'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component:Login
    },
    {
      path: '/register',
      name: 'Register',
      component:Register,
    },

    {
      path: '/reset',
      name: 'Reset',
      component:Reset,
    },
    {
      path: '/Teacher',
      name: 'Teacher',
      component:Teacher,
      children: [    //嵌套路由
        { path: '/TeacherMessage',name:'TeacherMessage', component: TeacherMessage },
        { path: '/TeacherCourse',name:'TeacherCourse', component: TeacherCourse },
        { path: '/TeacherAddPaper',name:'TeacherAddPaper', component: TeacherAddPaper },
        { path: '/TeacherChargePaper',name:'TeacherChargePaper', component: TeacherChargePaper },
        { path: '/TeacherEditPaper',name:'TeacherEditPaper', component: TeacherEditPaper },
        { path: '/TeacherSuggestLib',name:'TeacherSuggestLib', component: TeacherSuggestLib },
        { path: '/ChargeStudentPaper',name:'ChargeStudentPaper', component: ChargeStudentPaper },
        { path: '/TeacherExam',name:'TeacherExam', component: TeacherExam },
        { path: '/TeacherStatics',name:'TeacherStatics', component: TeacherStatics },
        { path: '/TeacherEcharts',name:'TeacherEcharts', component: TeacherEcharts },
      ]
    },
    { path: '/StudentExaming',name:'StudentExaming', component: StudentExaming },
    {
      path: '/Student',
      name: 'Student',
      component:Student,
      children: [    //嵌套路由
        {  path: "",  component:StudentMessage},
        { path: '/StudentMessage',name:'StudentMessage', component: StudentMessage },
        { path: '/ChoiceTest',name:'ChoiceTest', component: ChoiceTest },
        { path: '/ChargeTest',name:'ChargeTest', component: ChargeTest },
        { path: '/StudentExam',name:'StudentExam', component: StudentExam },
      ]
    },




  ]
})
