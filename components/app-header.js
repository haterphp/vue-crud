export default {
    template:
    `<div class="d-flex mb-4">
        <slot name="app-header-title"></slot>
        <div class="ml-auto">
            <button class="btn btn-success" @click="open_create_modal"><slot name="app-header-button-name"></slot></button>
        </div>
    </div>`,
    methods: {
        open_create_modal() {
            $('.modal').modal('show');
            this.$emit('change_app_state');
        },
    }
}