const DateTimeUtils = {
    timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if(diffHours < 1) return 'less than 1 hour ago';
        if(diffHours === 1) return '1 hour ago';

        return `${diffHours} hours ago`;
    }
};
