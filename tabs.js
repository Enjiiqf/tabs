/**
 * 标签页组件
 */
Vue.component('tabs', {
    template: '\
    <div class="tabs">\
        <div class="tabs-bar">\
            <!-- 标签页标题-->\
            <div :class="tabClass(item)"\
                v-for="(item, index) in titleList"\
                @click="change(index)">\
                {{ item.label }}\
                <span v-if="item.closable" class="close" @click="close(index,item.name)"></span>\
                </div>\
            </div>\
            <div class="tabs-content">\
             <!-- pane 组件位置-->\
                <slot></slot>\
            </div>\
           </div>',
    props: {
        value: {
            type: [String, Number]
        }
    },
    data: function () {
        return {
            currentIndex: this.value,
            titleList: []//存放标题
        }
    },
    methods: {
        //设置样式
        tabClass: function (item) {
            return ['tabs-tab', {
                //为当前选中的 tab 添加选中样式
                'tabs-tab-active': (item.name === this.currentIndex)
            }]

        },
        //获取定义的所有 pane 组件
        getTabs() {
            return this.$children.filter(function (item) {
                return (item.$options.name === 'pane');
            })
        },
        //更新 pane 是否显示状态
        updateIsShowStatus() {
            var tabs = this.getTabs();
            var that = this;
            //迭代判断并设置某个标签页是显示还是隐藏状态
            tabs.forEach(function (tab, index) {
                return tab.isShow = (index === that.currentIndex);
            })
        },
        //初始化
        init() {
            /**
             * 初始化标题数组
             */
            this.titleList = [];
            var that = this;//设置 this 引用
            this.getTabs().forEach(function (tab, index) {
                that.titleList.push({
                    label: tab.label,
                    name: index,
                    closable: tab.closable
                });

                //初始化默认选中的 tab 索引
                if (index === 0) {
                    if (!that.currentIndex) {
                        that.currentIndex = index;
                    }
                }
            });

            this.updateIsShowStatus();
        },
        //点击 tab 标题时，更新 value 值为相应的索引值
        change: function (index) {
            var nav = this.titleList[index];
            if (nav) {//避免关闭标签页时，nav 为 undefined 的情况
                var name = nav.name;
                this.$emit('input', name);
            }
        },
        //关闭标签页
        close: function (index, name) {
            //删除对应的标题元素
            this.titleList.splice(index, 1);

            var tabs = this.getTabs();
            var that = this;
            //迭代判断并设置点击的标签页是隐藏状态
            tabs.forEach(function (tab, index) {
                if (index === name) {
                    return tab.isShow = false;
                }
            });
        }
    },
    watch: {
        //当 value 值发生改变时，更新 currentIndex
        value: function (val) {
            this.currentIndex = val;
        },
        //当 currentIndex 值发生改变时，更新 pane 是否显示状态
        currentIndex: function () {
            this.updateIsShowStatus();
        }
    }
});
