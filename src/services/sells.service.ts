import { prisma } from ".."


export class SellsService{
    constructor(){}

    static async getPrice(id: number){
        try {
            const data= await prisma.book.findUnique({where: {id}})
            return {price: data?.sellPrice}
        } catch (error) {
            console.log({error})
            return {sucess: false, error: 'Hubo un error'}
        }
    }

    public static async create (sell:any){
        try {
            const {bookId, userId, date} = sell
            const {price} = await this.getPrice(bookId)


            const selled = await prisma.sell.create({
                data:{
                    bookId,
                    userId,
                    amount: price!,
                    date,
                },
                include:{
                    book:{
                        select:{
                            sellPrice: true
                        }
                    }
                }
            })
            console.log(price)
            return {sucess: true, sell: selled}
        } catch (error) {
            console.log({error})
            return{sucess: false, error: 'Hubo un error'}
        }
    }

    

    // public static async sellOneBook update(bookId: any, userId: any, amount: number){
    //     try {
    //         const data = await prisma.sell.update({where})
    //     } catch (error) {
            
    //     }
    // }
}