<template>
    <div id="login">
        <img src="../assets/logo.png" alt="">
        <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="login('formInline')">登录</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="register('formInline')">注册</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import router from '@/router'
    import md5 from 'md5'
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 5, message: '密码长度不能小于5位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('登录成功!')
                        router.push({path:'/todolist'})
                    } else {
                        this.$Message.error('登录失败!')
                    }
                })
            },
            register(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let params={
                            account:this.formInline.user,
                            password:md5(this.formInline.password)
                        }
                        this.axios.post('/auth/register',params)
                            .then(res => {
                                if(res.data.success) console.log('register success!')
                                else console.log('fail to register')
                            })
                        this.$Message.success('注册成功!')
                    } else {
                        this.$Message.error('注册失败!')
                    }
                })
            }
        }
    }
</script>
<style lang="css" scoped>
#login{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
#login img{
    position: absolute;
    left: 0;
    right:0;
    top:100px;
    margin:auto;   
}
.form{
    margin-top: 40px;
}
</style>
