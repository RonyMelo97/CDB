export default function Toaster() {

}

Toaster.prototype.show = (type, message) => {
    toastr[type](message);
}