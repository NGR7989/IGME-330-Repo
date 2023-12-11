class Region {

    constructor(row) {
        [this.providenceOrState, this.countryOrRegion, this.latitude, this.longitude, ...this.data] = row;
        this.data = this.data.map(el => +el);

        this.latitude = +this.latitude; 
        this.longitude = +this.longitude;
    }
}

export {Region};