<template>
    <div class="pagination">
        <!-- 上 -->
        <button :disabled = "pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)">1</button>
        <button v-if="startNumAndEndNum.start > 2 ">···</button>

        <!-- 中间部分 -->
        <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{page}}</button>

        <!-- 下 -->
        <button v-if="startNumAndEndNum.end < totalPage-1 ">···</button>
        <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)" >{{totalPage}}</button>
        <button :disabled="pageNo == totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:['pageNo','pageSize','total','continues'],
        computed:{
            //总共多少页
            totalPage(){
                //向上取整
                return  Math.ceil(this.total/this.pageSize)
            },
            //连续页码的起始与结束[连续页码的数字:至少是5]
            startNumAndEndNum(){
                //解构出连续的页码数,当前页码,总页数
                const {continues,pageNo,totalPage} = this

                //定义开始与结束变量存储连续的页码的起始数字与结束数字
                let start = 0,end = 0;

                //连续页码数字5[至少五页]
                if(continues > totalPage){
                    //总页数:少于连续页码数(5)
                    start = 1;
                    end = totalPage;
                }else{
                    //没超出[连续页码数为5,总页数大于5]
                    //开始数字
                    start = pageNo - parseInt(continues/2);
                    //结束数字
                    end = pageNo + parseInt(continues/2);

                    //起始start连续数字超出[0|负数]
                    if(start < 1){
                        start = 1;
                        end = continues;
                    }

                    //结束end连续数字超出尾页
                    if(end > totalPage){
                        end = totalPage;
                        start = totalPage - continues +1;
                    }
                }
                return {start,end}
            },
            
        }   
    }
</script>

<style lang="less" scoped>
    .pagination {
        text-align:center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }

    .active{
        background:skyblue
    }
</style>