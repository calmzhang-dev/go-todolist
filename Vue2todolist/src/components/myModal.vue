<template>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        
        <div class="content">
            <slot></slot>
        </div>

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleOk">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false
        };
    },
    methods: {
        open() {
            this.dialogVisible = true
        },
        close() {
            this.$emit('close');
        },
        handleClose() {
            this.dialogVisible = false
        },
        handleOk() {
            this.dialogVisible = false
            this.$emit('ok');
        }
    }
};
</script>