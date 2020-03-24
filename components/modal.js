export default{
    template:
    `<div class="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="modal-title"></slot>
                    <button type="button" class="close" @click="closeModal()" aria-label="Close">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="#" slot="body">
                        <div class="form-group" v-for="item in content">
                            <div v-if="item.type === 'select'">
                                <label>{{item.label}}</label>
                                <select class="form-control" v-model="item.value">
                                    <option  v-for="(option, index ) in item.options" :value="index">{{option}}</option>
                                </select>
                                <small class="invalid-feedback" v-if="item.errors">{{item.errors}}</small>
                            </div>
                            <div v-else>
                                <label>{{item.label}}</label>
                                <input :type="item.type" class="form-control" v-model="item.value"
                                       :class="{'is-invalid' : isFieldErrors(item)}">
                                <small class="invalid-feedback" v-if="item.errors">{{item.errors}}</small>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal()">Закрыть</button>
                    <button type="button" class="btn btn-primary" @click="createContent()">
                        <slot name="modal-button-name"></slot>
                    </button>
                </div>
            </div>
        </div>
    </div>`,
    props: ['content'],
    data() {
        return {
            obj: null
        }
    },
    methods: {
        isFieldErrors(field) {
            if (field.errors !== null)
                return true;
            return false;
        },
        createContent(type) {
            this.$emit('click', this.content, type);
        },
        closeModal(type) {
            this.$emit('close', type);
        }
    }
}