// 用来存放跟数据接口相关类型

// 登录接口返回数据类型
export type Token = {
    token: string;
    refresh_token: string;
};

// 我的 --个人信息
export type User={
    id: string;
    name: string;
    photo: string;
    art_count: number;
    follow_count: number;
    fans_count: number;
    like_count: number;
}

// 个人信息-- 获取并展示个人信息
export type UserProfile={
    id: string;
    photo: string;
    name: string;
    mobile: string;
    gender: number;
    birthday: string;
    intro: string;
};

// 请求接口返回得类型封装
type ApiResponse<Data> = {
    message: string;
    data: Data;
};

// 首页 频道数据类型
export type Channel={
    id:number,
    name:string
}
// 频道
export type UserChannel = {
    channels:Channel[]
}
// 所有频道
export type AllChannels={
    channels:Channel[]
}

export type Article = {
    art_id: string;
    aut_id: string;
    aut_name: string;
    comm_count: number;
    cover: {
        type: number;
        images: string[];
    };
    pubdate: string;
    title: string;
}

// home页面  文章列表数据
export type Articles={
    pre_timestamp: string;
    results: ArticleItem[];
}

//首页 搜索
export type Suggestion={
    options:string[]
}

 // 首页搜索结果
export type SearchResult={
    page: number;
    per_page: number;
    total_count: number;
    results: Articles['results'];
}

// -- 文章详情 --
export type ArticleDetail = {
    art_id: string;
    title: string;
    pubdate: string;
    aut_id: string;
    aut_name: string;
    aut_photo: string;
    is_followed: boolean;
    attitude: number;
    content: string;
    is_collected: boolean;
    // 接口中缺失
    comm_count: number;
    like_count: number;
    read_count: number;
};

// 评论项的类型
export type ArtComment={
    com_id: string;
    aut_id: string;
    aut_name: string;
    aut_photo: string;
    like_count: number;
    reply_count: number;
    pubdate: string;
    content: string;
    is_liking: boolean;
    is_followed: boolean;
}

// 文章评论的类型
export type ArticleComment={
    total_count: number;
    end_id: string | null;
    last_id: string | null;
    results: ArtComment[];
}


//  我的页面接口返回类型
export type UserResponse= User
//  个人信息页面接口返回类型
export type UserProfileResponse=UserProfile
// export type UserProfileResponse= ApiResponse<UserProfile>
export type UserPhotoResponse= ApiResponse<{photo: string}>

// 首页 频道数据类型
export type UserChannelResponse = UserChannel
// 所有频道数据
export type AllChannelsResponse=UserChannel
// home页面  文章列表
export type ArticlesResponse=ApiResponse<Articles>
// home 搜索
export type SuggestionResponse=Suggestion
// 首页搜索结果
export type SearchResponse=SearchResult
// 文章详情
export type ArticleDetailResponse=ArticleDetail
// 文章评论
export type ArticleCommentResponse=ArticleComment
