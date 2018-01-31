// import Skeleton from './skeleton';
/**
 *
 */
module.exports = class AngularModule {

    constructor(package_name, username, name, email, url) {
        this.package_name = package_name;
        this.name = name;
        this.email = email;
        this.url = url;
    }

    generate() {
        console.log(this.package_name);
        console.log(this.username);
        console.log(this.name);
        console.log(this.email);
        console.log(this.url);
    }
}
