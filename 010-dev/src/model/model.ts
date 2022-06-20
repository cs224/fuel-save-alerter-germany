
import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Station {

    constructor(id: string, createdat: Date, name: string, brand: string, street: string, houseNumber: string, postCode: string, city: string, distance: number) {
        this.id = id;
        this.createdat = createdat;
        this.name = name;
        this.brand = brand;
        this.street = street;
        this.houseNumber = houseNumber;
        this.postCode = postCode;
        this.city = city;
        this.distance = distance;
    }

    @PrimaryColumn()
    id: string

    @Column({ type: 'timestamptz' })
    createdat: Date

    @Column()
    name: string

    @Column()
    brand: string

    @Column()
    street: string

    @Column()
    houseNumber: string

    @Column()
    postCode: string

    @Column()
    city: string

    @Column("numeric")
    distance: number
}

@Entity()
export class Price {

    constructor(id: string, createdat: Date, isOpen: boolean, diesel: number | null, e5: number | null, e10: number) {
        this.id = id;
        this.createdat = createdat;
        this.isOpen = isOpen;
        this.diesel = diesel;
        this.e5 = e5;
        this.e10 = e10;
    }

    @PrimaryColumn()
    id: string

    @PrimaryColumn({ type: 'timestamptz' })
    createdat: Date

    @Column()
    isOpen: boolean

    @Column("numeric")
    diesel: number | null

    @Column("numeric")
    e5: number | null

    @Column("numeric")
    e10: number
}
