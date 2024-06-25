export class ListItemDto {
    constructor(
        public listItemId: number,
        public listId: number,
        public itemName: string,
        // public quantity: number,
        public orderPosition: number,
        public itemNotes: string
        //leaving this here but commenting out; develop for sublists
        // public listItems: ListItemDto[],
    ){}
}
