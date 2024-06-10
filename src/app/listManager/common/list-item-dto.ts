export class ListItemDto {
    constructor(
        public ordered: boolean,
        public listItems: ListItemDto[],
        public listId: number,
        public numberOfItems: number,
        public userId: number,
        public listName: string,
        public listNotes: string
    ){}
}
