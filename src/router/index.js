import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Main/Login'
import Register from '@/views/Main/Register'
import Reset from '@/views/Main/Reset'
import Teacher from '@/views/Teacher'
import TeacherCourse from '@/views/Teacher/Course'
import TeacherMessage from '@/views/Teacher/Message'
import Student from  '@/views/Student'
import StudentMessage from  '@/views/Student/Message'
import StudentAddQuest from  '@/views/Student/AddQuestion'
import SuggestLib from  '@/views/Student/SuggestLib'
import StudentAlterQ from  '@/views/Student/SuggestLib/AlterQ'
import Manager from '@/views/Manager'
import ManagerReviewST from '@/views/Manager/Review'
import ManagerReviewM from '@/views/Manager/ManagerReview'
import ManagerTeacher from '@/views/Manager/Teacher'
import ManagerStudent from '@/views/Manager/Student'
import ManagerCourse from '@/views/Manager/Course'
import Knowledge from '@/views/Manager/Course/Knowledge'
import ChoiceT from '@/views/Manager/Course/ChoiceT'
import DeleteT from '@/views/Manager/Course/DeleteT'
import ChoiceS from '@/views/Manager/Course/ChoiceS'
import DeleteS from '@/views/Manager/Course/DeleteS'
import ManagerQuestLib from '@/views/Manager/QuestionLib'
import ALTERQ from '@/views/Manager/QuestionLib/AlterQ'
import ManagerExport from '@/components/Export';
import ManagerMessage from '@/views/Manager/Message'
import StudentImport from '@/components/Export';
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
        { path: '/TeacherMessage',name:'TeacherCourse', component: TeacherMessage },
        { path: '/TeacherCourse',name:'TeacherMessage', component: TeacherCourse },
      ]
    },
    {
      path: '/Student',
      name: 'Student',
      component:Student,
      children: [    //嵌套路由
        {  path: "",  component:StudentMessage},
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




  ]
})
