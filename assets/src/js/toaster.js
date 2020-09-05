export default function Toaster() {
    this.show = (type, message) => {
        toastr[type](message);
    }
}