import { useState } from 'react';
import Box from '../components/Box';
import Badge from '../components/Badge';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Globe, Award, ExternalLink } from 'lucide-react';
import Button from '../components/Button';

const categoryWiseSites = {
  '전체': [
    { name: 'GitHub', visits: 2340, category: '개발', change: '+12%' },
    { name: 'Stack Overflow', visits: 1890, category: '개발', change: '+8%' },
    { name: 'Medium', visits: 1560, category: '뉴스', change: '+15%' },
  ],
  '개발': [
    { name: 'GitHub', visits: 2340, category: '개발', change: '+12%' },
    { name: 'Stack Overflow', visits: 1890, category: '개발', change: '+8%' },
    { name: 'Dev.to', visits: 1650, category: '개발', change: '+18%' },
  ],
  '디자인': [
    { name: 'Figma', visits: 1230, category: '디자인', change: '+5%' },
    { name: 'Dribbble', visits: 1150, category: '디자인', change: '+7%' },
    { name: 'Behance', visits: 980, category: '디자인', change: '+12%' },
  ],
};

const categoryDistribution = [
  { name: '개발/기술', value: 35, color: '#8b5cf6' },
  { name: '디자인', value: 22, color: '#10b981' },
  { name: '뉴스/미디어', value: 18, color: '#f59e0b' },
  { name: '교육', value: 15, color: '#ef4444' },
  { name: '비즈니스', value: 10, color: '#3b82f6' }
];




const communityInsights = [
  {
    title: '가장 활발한 시간대',
    value: '오후 2-4시',
    description: '전체 사용자의 67%가 활동',
    icon: Users,
  },
  {
    title: '평균 브라우징 시간',
    value: '1시간 23분',
    description: '지난주 대비 +8% 증가',
    icon: TrendingUp,
  },
  {
    title: '평균 방문한 사이트',
    value: '18.5개',
    description: '매일 다양한 사이트 방문',
    icon: Globe,
  }
];

const CommunityTrends = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const getChangeColor = (change) => {
    if (change.startsWith('+')) return 'text-green-600';
    if (change.startsWith('-')) return 'text-red-600';
    return 'text-gray-500';
  };

  const currentSites = categoryWiseSites[selectedCategory] || categoryWiseSites['전체'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {communityInsights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <Box key={index}>
              <div className="flex items-center">
                <div className="inline-flex p-3 rounded-lg bg-gray-100 mr-4">
                  <IconComponent className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{insight.title}</p>
                  <p className="text-gray-800 font-bold text-xl">{insight.value}</p>
                </div>
              </div>
            </Box>
          );
        })}
      </div>

      <Box>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center"><Award className="w-5 h-5 mr-2 text-purple-600" />카테고리별 인기 사이트 TOP 3</h3>
        <div className="flex space-x-2 border-b mb-4">
          {Object.keys(categoryWiseSites).map(category => (
            <Button 
              key={category} 
              variant={selectedCategory === category ? 'primary' : 'ghost'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="space-y-3">
          {currentSites.map((site, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-purple-500 font-bold">{index + 1}</div>
                <div>
                  <h4 className="font-semibold">{site.name}</h4>
                  <span className="text-sm text-gray-500">{site.visits.toLocaleString()} 방문</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-semibold ${getChangeColor(site.change)}`}>{site.change}</span>
                <Button variant="outline" size="xs"><ExternalLink className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      </Box>

      <Box>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">카테고리별 관심사 분포</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                {categoryDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {categoryDistribution.map((category, index) => (
              <div key={index} className="flex items-center">
                <Badge style={{ backgroundColor: category.color, color: 'white' }}>
                  {category.name}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
}

export default CommunityTrends;