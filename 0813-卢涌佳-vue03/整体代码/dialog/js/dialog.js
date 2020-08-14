Vue.component("kkb-dialog", {
  props: {
    title: String,
    visible: Boolean,
  },
  template: `
        <div class="dialog" v-show="visible">
            <div class="dialog-header">
                <span class="dialog-title">提示</span>
                <i class="dialog-close" @click="close">x</i>
            </div>
            <div class="dialog-body">
                <slot></slot>
            </div>
        </div>
    `,
  methods: {
    open() {
      this.$emit("open");
    },
    close() {
      this.$emit("update:visible");
      this.$emit("close");
    },
  },

  updated() {
    if (this.visible) {
      this.open();
    }
  },
});
