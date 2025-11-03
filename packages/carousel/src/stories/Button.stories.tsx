import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '../components/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Button 컴포넌트

재사용 가능한 범용 버튼 컴포넌트입니다. Carousel의 네비게이션 버튼으로도 사용됩니다.

## 주요 기능

- 🎨 **유연한 스타일링**: className 및 style prop으로 자유롭게 커스터마이징
- 🎯 **아이콘 지원**: 텍스트, 아이콘, 또는 둘 다 표시 가능
- ♿ **접근성**: ARIA 레이블 및 키보드 네비게이션 지원
- 🔒 **비활성화 상태**: disabled 상태 지원
- 📱 **반응형**: 모든 화면 크기에서 동작

## 기본 사용법

\`\`\`tsx
import { Button } from "@orbital0m0/carousel";

<Button onClick={() => console.log('클릭!')}>
  클릭하세요
</Button>
\`\`\`

## 스타일 커스터마이징

\`\`\`tsx
<Button
  onClick={handleClick}
  style={{
    padding: '12px 24px',
    background: '#007bff',
    color: 'white',
    borderRadius: '6px',
  }}
>
  커스텀 버튼
</Button>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내부에 표시될 텍스트 또는 ReactNode',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    icon: {
      control: 'text',
      description: '버튼에 표시될 아이콘 (텍스트 또는 ReactNode)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: '버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '가장 기본적인 형태의 버튼입니다. 텍스트만 포함하며, 추가 스타일링 없이 사용됩니다.',
      },
    },
  },
};

// 아이콘이 있는 버튼
export const WithIcon: Story = {
  args: {
    icon: '🎬',
    children: '영화 보기',
  },
  parameters: {
    docs: {
      description: {
        story:
          '아이콘과 텍스트를 함께 표시하는 버튼입니다. 시각적 힌트를 제공하여 버튼의 기능을 명확하게 전달할 수 있습니다.',
      },
    },
  },
};

// 아이콘만 있는 버튼
export const IconOnly: Story = {
  args: {
    icon: '▶',
    'aria-label': '재생',
  },
  parameters: {
    docs: {
      description: {
        story: `아이콘만 표시하는 버튼입니다. 미디어 컨트롤, 네비게이션 등에 적합합니다.

**중요:** 아이콘만 있는 버튼은 반드시 \`aria-label\`을 제공해야 합니다.`,
      },
    },
  },
};

// 비활성화 버튼
export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '비활성화된 상태의 버튼입니다. 클릭할 수 없으며, 일반적으로 시각적으로 구분됩니다. 폼 검증, 로딩 상태 등에 사용됩니다.',
      },
    },
  },
};

// 비활성화 + 아이콘 버튼
export const DisabledWithIcon: Story = {
  args: {
    icon: '🔒',
    children: '잠김',
    disabled: true,
  },
};

// 캐러셀 네비게이션 버튼 (이전)
export const CarouselPrev: Story = {
  args: {
    children: '‹',
    className: 'slider-button slider-button-prev',
    'aria-label': '이전 슬라이드',
  },
  parameters: {
    docs: {
      description: {
        story: `캐러셀의 '이전' 네비게이션 버튼 예시입니다.

**특징:**
- 원형 디자인
- 반투명 배경
- 호버 시 배경 진해짐
- 왼쪽에 위치

Carousel.LeftButton에서 내부적으로 사용됩니다.`,
      },
    },
  },
  render: (args: any) => (
    <div style={{ position: 'relative', width: '60px', height: '60px' }}>
      <Button {...args} />
      <style>{`
        .slider-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slider-button:hover {
          background: rgba(0, 0, 0, 0.7);
        }
        .slider-button-prev {
          left: 0;
        }
      `}</style>
    </div>
  ),
};

// 캐러셀 네비게이션 버튼 (다음)
export const CarouselNext: Story = {
  args: {
    children: '›',
    className: 'slider-button slider-button-next',
    'aria-label': '다음 슬라이드',
  },
  parameters: {
    docs: {
      description: {
        story: `캐러셀의 '다음' 네비게이션 버튼 예시입니다.

**특징:**
- 원형 디자인
- 반투명 배경
- 호버 시 배경 진해짐
- 오른쪽에 위치

Carousel.RightButton에서 내부적으로 사용됩니다.`,
      },
    },
  },
  render: (args: any) => (
    <div style={{ position: 'relative', width: '60px', height: '60px' }}>
      <Button {...args} />
      <style>{`
        .slider-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .slider-button:hover {
          background: rgba(0, 0, 0, 0.7);
        }
        .slider-button-next {
          right: 0;
        }
      `}</style>
    </div>
  ),
};

// 커스텀 스타일 버튼
export const CustomStyle: Story = {
  args: {
    children: '커스텀 버튼',
    style: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
  },
  parameters: {
    docs: {
      description: {
        story: `\`style\` prop을 사용하여 완전히 커스터마이징된 버튼입니다.

**적용된 스타일:**
- 그라데이션 배경
- 커스텀 패딩 및 글꼴
- 둥근 모서리
- 전환 효과

인라인 스타일로 빠르게 디자인을 적용할 수 있습니다.`,
      },
    },
  },
};

// 여러 버튼 그룹
export const ButtonGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: `다양한 색상의 버튼을 그룹으로 표시한 예시입니다.

**포함된 버튼:**
- Primary (파란색)
- Secondary (회색)
- Success (초록색)
- Danger (빨간색)
- Warning (노란색)
- Info (청록색)

각 버튼은 서로 다른 의미와 용도를 가집니다.`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button
        style={{
          padding: '8px 16px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Primary
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          background: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Secondary
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          background: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Success
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Danger
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          background: '#ffc107',
          color: 'black',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Warning
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          background: '#17a2b8',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Info
      </Button>
    </div>
  ),
};

// 다양한 크기
export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: `다양한 크기의 버튼을 보여주는 예시입니다.

**크기 옵션:**
- Small: 12px 글꼴, 4px/8px 패딩
- Medium: 14px 글꼴, 8px/16px 패딩 (권장)
- Large: 16px 글꼴, 12px/24px 패딩
- Extra Large: 18px 글꼴, 16px/32px 패딩

용도와 중요도에 따라 적절한 크기를 선택하세요.`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Button
        style={{
          padding: '4px 8px',
          fontSize: '12px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Small
      </Button>
      <Button
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Medium
      </Button>
      <Button
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Large
      </Button>
      <Button
        style={{
          padding: '16px 32px',
          fontSize: '18px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Extra Large
      </Button>
    </div>
  ),
};
