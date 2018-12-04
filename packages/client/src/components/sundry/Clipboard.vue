<script>
import Clipboard from "clipboard";

export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    target: {
      type: HTMLElement
    },
    // 当target传入时，并且target为input或者textarea时支持 copy、cut 操作
    action: {
      type: String,
      default: "copy"
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    tooltipTitle: {
      type: String,
      default: "点击复制"
    },
    success: {
      type: String,
      default: "复制成功"
    },
    size: {
      type: Number,
      default: 16
    }
  },
  render() {
    let element;

    if (this.$slots.default) {
      element = (
        <span class="clipboard" ref="clipboard">
          {this.$slots.default}
        </span>
      );
    } else {
      element = (
        <span class="clipboard" ref="clipboard">
          <a-icon type="copy" style={{ fontSize: this.size + "px" }} />
        </span>
      );
    }

    if (this.tooltip) {
      element = (
        <a-tooltip title={this.tooltipTitle} placement="top">
          {element}
        </a-tooltip>
      );
    }

    return element;
  },
  mounted() {
    const option = this.target
      ? { target: () => this.target, action: this.action }
      : { text: () => this.value };
    this.clipboard = new Clipboard(this.$refs.clipboard, option);
    this.clipboard.on("success", e => {
      this.success && this.$message.success(this.success);
      e.clearSelection();
      this.$emit("success", e);
    });
    this.clipboard.on("error", e => this.$emit("error", e));
  },
  beforeDestroy() {
    this.clipboard.destroy();
  }
};
</script>

<style lang="less" scoped>
.clipboard {
  padding: 5px;

  .anticon {
    cursor: pointer;
    transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      color: #1890ff;
    }
  }
}
</style>
