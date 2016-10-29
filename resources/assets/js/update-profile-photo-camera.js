var Webcam = require('webcamjs');
var modal = '#profile-photo-camera-modal';
var preview = '#profile-photo-camera-preview';

module.exports = {
    mounted() {
        this.initCamera();
    },

    // Vue 1.x
    ready() {
        this.initCamera();
    },

    methods: {
        /**
         * Initialize the camera.
         */
        initCamera() {
            this.configureWebcamjs(Webcam);

            $(modal).on('shown.bs.modal', () => {
                Webcam.attach(preview);
            })
            .on('hidden.bs.modal', () => {
                Webcam.reset();
            });
        },

        /**
         * Open the camera modal.
         */
        openCamera() {
            this.form.errors.forget();

            $(modal).modal('show');
        },

        /**
         * Close the camera modal.
         */
        closeCamera() {
            this.form.errors.forget();

            $(modal).modal('hide');
        },

        /**
         * Take a picture.
         */
        takePicture() {
            this.configureCameraSize();

            Webcam.snap((imageUri) => {
                this.form.startProcessing();

                this.$http.post('/settings/photo', this.cameraFormData(imageUri))
                    .then((response) => {
                        this.closeCamera();

                        if (window.Bus) {
                            window.Bus.$emit('updateUser');
                        } else {
                            this.$dispatch('updateUser');
                        }

                        this.form.finishProcessing();
                    })
                    .catch((response) => {
                        this.form.setErrors(response.data);
                    });
            });
        },

        /**
         * Create the FormData object from the image data uri.
         *
         * @param  {String} imageUri
         * @return {FormData}
         */
        cameraFormData(imageUri) {
            const form = new FormData();
            const data = imageUri.replace(/^data\:image\/\w+\;base64\,/, '');
            const type = imageUri.match(/^data\:image\/(\w+)/) ? RegExp.$1 : '';
            const blob = new Blob([Webcam.base64DecToArr(data)], {type: `image/${type}`});

            form.append('photo', blob);

            return form;
        },

        /**
         * Configure the width and height.
         */
        configureCameraSize() {
            const video = $(`${preview} video`)[0];

            Webcam.set({
                width: video.videoWidth,
                height: video.videoHeight
            });

            Webcam.params.dest_width = Webcam.params.dest_width = Webcam.params.width;
            Webcam.params.dest_height = Webcam.params.dest_height = Webcam.params.height;
        },

        /**
         * Configure Webcamjs.
         *
         * @param {Object} Webcam
         */
        configureWebcamjs(Webcam) {

        }
    }
};
