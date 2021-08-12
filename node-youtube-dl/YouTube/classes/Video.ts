interface VideoOptions {
    id?: string;
    url? : string;
    title?: string;
    description?: string;
    duration_formatted: string;
    duration: number;
    uploadedAt?: string;
    views: number;
    thumbnail?: JSON;
    channel?: JSON;
    videos?: Video[];
    type : string;
    ratings : {   
        likes: number;
        dislikes: number;
    }
    live: boolean;
    private: boolean;
    tags: string[];
}

export class Video {
    id?: string;
    title?: string;
    description?: string;
    durationFormatted: string;
    duration: number;
    uploadedAt?: string;
    views: number;
    thumbnail?: JSON;
    channel?: JSON;
    videos?: Video[];
    likes: number;
    dislikes: number;
    live: boolean;
    private: boolean;
    tags: string[];

    constructor(data : any){
        if(!data) throw new Error(`Can not initiate ${this.constructor.name} without data`)
        this.id = data.id || undefined;
        this.title = data.title || undefined;
        this.description = data.description || undefined;
        this.durationFormatted = data.duration_raw || "0:00";
        this.duration = (data.duration < 0 ? 0 : data.duration) || 0;
        this.uploadedAt = data.uploadedAt || undefined;
        this.views = parseInt(data.views) || 0;
        this.thumbnail = data.thumbnail || {};
        this.channel = data.channel || {};
        this.likes = data.ratings?.likes as number || 0;
        this.dislikes = data.ratings?.dislikes || 0;
        this.live = !!data.live;
        this.private = !!data.private;
        this.tags = data.tags || [];
    }

    get url(){
        if(!this.id) return undefined
        else return `https://www.youtube.com/watch?v=${this.id}`;
    }

    get type(): "video" {
        return "video";
    }

    get toString(): string {
        return this.url || "";
    }

    get toJSON(): VideoOptions{
        return {
            id: this.id,
            url: this.url,
            title: this.title,
            description: this.description,
            duration: this.duration,
            duration_formatted: this.durationFormatted,
            uploadedAt: this.uploadedAt,
            thumbnail: this.thumbnail,
            channel: this.channel,
            views: this.views,
            type: this.type,
            tags: this.tags,
            ratings: {
                likes: this.likes,
                dislikes: this.dislikes
            },
            live: this.live,
            private: this.private
        };
    }
}