/**
 * 子窗口组件
 */
Vue.component('pane', {
    name: 'pane',
    template: '\
    <div class="pane" v-show="isShow">\
        <slot></slot>\
    </div>\
    ',
    props: {
        //标题
        label: {
            type: String,
            default: ''
        },
        //是否可关闭
        closable: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            //显示或隐藏
            isShow: true
        }
    },
    methods: {
        //通知父组件，更新标题
        init() {
            this.$parent.init();
        }
    },
    watch: {
        //当 label 值发生变化时，更新标题
        label() {
            this.init();
        }
    },
    //挂载时，更新标题
    mounted() {
        this.init();
    }
});