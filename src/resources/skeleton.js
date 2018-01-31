/**
 *
 */
module.exports = class Skeleton {

    constructor(package_name, username, name, email, url){
        this.package_name = package_name;
        this.name = name;
        this.email = email;
        this.url = url;
    }
    /**
     *
     */
    generate() {
        throw new Error("This method must be overwritten!");
    }

}
