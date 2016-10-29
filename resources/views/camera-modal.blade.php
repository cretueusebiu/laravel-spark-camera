<div id="profile-photo-camera-modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close" data-dismiss="modal">&times;</span>
                <h4 class="modal-title">Take a picture</h4>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger" v-if="form.errors.has('photo')">
                    @{{ form.errors.get('photo') }}
                </div>

                <div id="profile-photo-camera-preview"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default pull-left" :disabled="form.busy" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary" :disabled="form.busy" @click="takePicture">Take picture</button>
            </div>
        </div>
    </div>
</div>

<style>
    #profile-photo-camera-preview,
    #profile-photo-camera-preview video {
        width: 100% !important;
        height: auto !important;
        min-width: 100px;
        min-height: 100px;
    }
</style>
