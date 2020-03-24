import TableWrapper from './table.js';
import AppHeader from './app-header.js';

export default{
    template:
    `<div class="container mt-5">
        <div>
            <app-header @change_app_state="changeAppState">
                <template #app-header-title>
                    <slot name="app-title"></slot>
                </template>
                <template #app-header-button-name>
                    <slot name="app-button-name"></slot>
                </template>
            </app-header>
            <table-wrapper @delete_tr="delete_tr" @edit_tr="edit_tr" :content="tablecontent"></table-wrapper>
        </div>
    </div>`,
    props: ['tablecontent'],
    components: {
        'table-wrapper': TableWrapper,
        'app-header': AppHeader
    },
    methods: {
        delete_tr(item) {
            this.$emit('delete_tr', item);
        },
        edit_tr(item) {
            this.$emit('edit_tr', item);
        },
        changeAppState() {
            this.$emit('change_app_state');
        }
    }
}