export interface Event {
    id: number;
    event_name: string;  
    event_price: number;
    event_date: Date;
    event_time: string;   
    event_image:string;   
    created_at?: string;
    updated_at?: string;
}