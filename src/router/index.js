import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Main/Login'
import Register from '@/views/Main/Register'
import Reset from '@/views/Main/Reset'
import Teacher from '@/views/Teacher'
import TeacherCourse from '@/views/Teacher/Course'
import TeacherKnowledge from '@/components/Knowledge'
import TeacherChoiceS from '@/components/PersonCharge/ChoiceS'
import TeacherDeleteS from '@/components/PersonCharge/DeleteS'
import TeacherChargeC from '@/views/Teacher/Course/ChargeLib'
import TeacherAlterQ from '@/components/AlterQuestion'
import TeacherImport from '@/components/Export';
import TeacherSuggestLib from '@/views/Teacher/SuggestLib';
import TeacherMessage from '@/views/Teacher/Message'
import Student from  '@/views/Student'
import StudentMessage from  '@/views/Student/Message'
import StudentAddQuest from  '@/views/Student/AddQuestion'
import SuggestLib from  '@/views/Student/SuggestLib'
import StudentAlterQ from  '@/components/AlterQuestion'
import Manager from '@/views/Manager'
import ManagerReviewST from '@/views/Manager/Review'
import ManagerReviewM from '@/views/Manager/ManagerReview'
import ManagerTeacher from '@/views/Manager/Teacher'
import ManagerStudent from '@/views/Manager/Student'
import ManagerCourse from '@/views/Manager/Course'
import Knowledge from '@/components/Knowledge'
import ChoiceT from '@/components/PersonCharge/ChoiceT'
import DeleteT from '@/components/PersonCharge/DeleteT'
import ChoiceS from '@/components/PersonCharge/ChoiceS'
import DeleteS from '@/components/PersonCharge/DeleteS'
import ManagerQuestLib from '@/views/Manager/QuestionLib'
import ALTERQ from '@/components/AlterQuestion'
import ManagerExport from '@/components/Export';
import ManagerMessage from '@/views/Manager/Message'
import StudentImport from '@/components/Export';
import noPage from '@/views/404'
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
        { path: '/TeacherKnowledge',name:'TeacherKnowledge', component: TeacherKnowledge },
        { path: '/TeacherDeleteS',name:'TeacherDeleteS', component: TeacherDeleteS },
        { path: '/TeacherChoiceS',name:'TeacherChoiceS', component: TeacherChoiceS },
        { path: '/TeacherImport',name:'TeacherImport', component: TeacherImport },
        { path: '/TeacherChargeC',name:'TeacherChargeC', component: TeacherChargeC },
        { path: '/TeacherAlterQ',name:'TeacherAlterQ', component: TeacherAlterQ },
        { path: '/TeacherSuggestLib',name:'TeacherSuggestLib', component: TeacherSuggestLib },
      ]
    },
    {
      path: '/Student',
      name: 'Student',
      component:Student,
      children: [    //嵌套路由
        { path: '/StudentMessage',name:'StudentMessage', component: StudentMessage },
        { path: '/StudentAddQuest',name:'StudentAddQuest', component: StudentAddQuest },
        { path: '/StudentImport',name:'StudentImport', component: StudentImport },
        { path: '/SuggestLib',name:'SuggestLib', component: SuggestLib },
        { path: '/StudentAlterQ',name:'StudentAlterQ', component: StudentAlterQ },
      ]
    },
    {
      path: '/Manager',
      name: 'Manager',
      component:Manager,
      children: [    //嵌套路由
        { path: '/ManagerReviewST',name:'ManagerReviewST', component: ManagerReviewST },
        { path: '/ManagerReviewM',name:'ManagerReviewM', component: ManagerReviewM },
        { path: '/ManagerMessage',name:'ManagerMessage', component: ManagerMessage },
        { path: '/ManagerTeacher',name:'ManagerTeacher', component: ManagerTeacher },
        { path: '/ManagerStudent',name:'ManagerStudent', component: ManagerStudent },
        { path: '/ManagerCourse',name:'ManagerCourse', component: ManagerCourse },
        { path: '/Knowledge',name:'Knowledge', component: Knowledge },
        { path: '/ChoiceT',name:'ChoiceT', component: ChoiceT },
        { path: '/DeleteT',name:'DeleteT', component: DeleteT },
        { path: '/ChoiceS',name:'ChoiceS', component: ChoiceS },
        { path: '/DeleteS',name:'DeleteS', component: DeleteS },
        { path: '/ManagerQuestLib',name:'ManagerQuestLib', component: ManagerQuestLib },
        { path: '/ALTERQ',name:'ALTERQ', component: ALTERQ },
        { path: '/ManagerExport',name:'ManagerExport', component: ManagerExport },
      ]
    },
    {
      path: '/*',
      name: 'noPage',
      component:noPage,
    },



  ]
})
