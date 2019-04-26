var tableMixin = {
  data(){
    return {
      defaultParams:{page:1,rows:10,},
      selectCloumn: []
    }
  },
  mounted(){
    this.calSelection([]);
  },
  methods: {
    handleClick(event) {
       switch (event){
         case 'ADD':
           this.handleAddClick();
           break;
         case 'DELETE':
           this.handleDeleteClick();
           break;
         case 'ALTER':
           this.handleAlterClick();
           break;
         case 'EXPORT':
           this.handleExportClick();
           break;
       }
    },
    calSelection(val){
      this.selectCloumn=val;
      this.ButtonGroup.forEach((item,index)=>{
        const i = {...item};
        if(i.event=='ALTER'||i.event=='CHARGEK'||i.event=='CHOICEM'||i.event=='DELETEM'||i.event=='CHOICES'||i.event=='DELETES'||i.event=='ALTERQ'||i.event=='IMPORT'||i.event=='CHARGE'||i.event=='VIEW')  i.disable=!(this.selectCloumn.length > 0 && this.selectCloumn.length < 2);
        this.ButtonGroup.splice(index, 1, i)
      })
    },
    handleAddClick(){
      this.myForm.length=0;
      this.myForm.splice(0,1,{});
      console.log(this.myForm)
      setTimeout(()=>{
        this.dialogVisible=true;
      },0)
    },
    //需要给delete添加一个对象，用来进行api和对应的参数识别
    handleDeleteClick(){
        this.paramsChange();
        if (this.selectCloumn.length > 0) {
          this.$confirm("是否进行删除","提示",{
            confirmButtonText: "确定",
            cancelButtonText:"取消",
            type: 'warning'
          }).then(() => {
            const idArray = [];
            this.selectCloumn.forEach(item => {
             /* idArray.push(item[this.id])*/
            });
            //是否能够同一个函数进行实现，这个传递的参数
            remove(this.api[action], {pks: idArray.join(',')}).then(() => {
              this.$message({
                type: 'success',
                message: "删除成功",
                showClose: true
              });
              this.getTable();
            }).catch(() => {
              /*this.tableLoading = false;*/
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              showClose: true,
              message: "取消信息删除"
            })
          })
        } else {
          this.$message({
            message: "请选择删除的数据",
            type: 'warning'
          });
        }
      },
    handleAlterClick(){
      console.log("alter");
      this.myForm.length=0;
      this.myForm.splice(0,1,{myEmail: '4408811996@qq.com', tno: '001', sex: '男', name: '小熊', myTitle: '副教授'});
      console.log(this.myForm)
      setTimeout(()=>{
        this.dialogVisible=true;
      },0)

    },
    handleExportClick(){

    },
    handleMesChange(pageMessage){
      this.defaultParams=pageMessage;
      this.getTable();
    },
    //只有数据删除的时候才进行paramsChnage
    paramsChange(){
      const pages=Math.floor(this.selectCloumn.length/this.defaultParams.size);//计算删除离几页
      if(pages>0){
          const lastPage=Math.ceil(this.total/this.defaultParams.size);//总页数
          const calPage=lastPage-pages;//删除之后在那一页
          if(this.defaultParams.page>calPage) this.defaultParams.page=calPage; //如果页数进行变更
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
           this.dialogVisible=false;
        })
        .catch(_ => {});
    },
    onSearch(){
      this.defaultParams={page:1,rows:10};
      this.getTable();
    },
  }
};
export default tableMixin;
