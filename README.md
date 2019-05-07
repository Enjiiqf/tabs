# tabs
 Vue.js 中实现标签页组件

使用组件嵌套方式，将多个 pane 组件作为 tabs 组件的 slot。
tabs 组件与 pane 组件，通过父子链（即 $parent 与 $children）实现通信。

为 pane 组件新增一个 closable 属性，用于控制该标签是否可关闭。
在切换标签页时，加上滑动动画，只要在激活的样式中加上 transform 与 transition 样式即可：
