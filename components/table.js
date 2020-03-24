import TableTR from './table-tr.js';

export default{
    template:
    ` <div class="table-wrapper">
        <table class="table table-striped table-hover">
            <tr>
                <th>#</th>
                <th v-for="item in tableFields" :key="item">{{item}}</th>
                <th class="text-right">actions</th>
            </tr>
            <tr is="table-tr" v-for="(item, i) in content" :number="i+1" :item="item" :key="item.name" @delete_tr="delete_tr" @edit_tr="edit_tr"></tr>
        </table>
    </div>`,
    props: ['content'],
    components: {
        'table-tr': TableTR
    },
    data() {
        return {
            tableFields: []
        }
    },
    methods: {
        delete_tr(item, type) {
            this.$emit('delete_tr', item);
        },
        edit_tr(item, type) {
            this.$emit('edit_tr', item);
        }
    },
    watch: {
        content: function () {
            this.tableFields = [];
            for (let key in this.content[0]) {
                if (!['created_at', 'updated_at', 'id'].includes(key)) {
                    this.tableFields.push(key);
                }
            }
        }
    }
}