import styled from "styled-components";
import {
  HiOutlineEnvelope,
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBookOpen,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 2rem;
`;

const Card = styled.a`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: rgba(99, 102, 241, 0.3);
  }
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconBox = styled.div`
  width: 4.4rem;
  height: 4.4rem;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) =>
    `linear-gradient(135deg, ${color}30, ${color}10)`};

  svg {
    width: 2.2rem;
    height: 2.2rem;
    color: ${({ color }) => color};
  }
`;

const ExternalIcon = styled(HiOutlineArrowTopRightOnSquare)`
  width: 1.6rem;
  height: 1.6rem;
  color: var(--color-grey-400);
`;

const CardTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;

const CardDesc = styled.p`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  line-height: 1.5;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-grey-100);
  margin: 1.2rem 0;
`;

const FAQSection = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
`;

const FAQItem = styled.details`
  padding: 1.6rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:last-child {
    border-bottom: none;
  }

  summary {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-grey-800);
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: center;
    gap: 1rem;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: "+";
      font-size: 1.8rem;
      color: var(--color-brand-500);
      font-weight: 700;
      width: 2rem;
      text-align: center;
    }
  }

  &[open] summary::before {
    content: "−";
  }

  p {
    margin-top: 1rem;
    padding-left: 3rem;
    font-size: 1.4rem;
    color: var(--color-grey-500);
    line-height: 1.6;
  }
`;

const RESOURCES = [
  {
    icon: <HiOutlineBookOpen />,
    color: "#6366f1",
    title: "Documentation",
    desc: "Complete guide to managing bookings, cabins, and guests.",
    href: "https://github.com/Pratyaksh1507/horizon-stay",
  },
  {
    icon: <HiOutlineDocumentText />,
    color: "#10b981",
    title: "API Reference",
    desc: "Supabase API endpoints and database schema reference.",
    href: "https://supabase.com/docs",
  },
  {
    icon: <HiOutlineChatBubbleLeftRight />,
    color: "#f59e0b",
    title: "Community",
    desc: "Join the discussion on GitHub — report bugs and request features.",
    href: "https://github.com/Pratyaksh1507/horizon-stay/issues",
  },
  {
    icon: <HiOutlineEnvelope />,
    color: "#06b6d4",
    title: "Contact Support",
    desc: "Reach out via email for direct assistance.",
    href: "mailto:pratyaksh@horizonstay.com",
  },
];

const FAQS = [
  {
    q: "How do I create a new booking?",
    a: 'Navigate to the "New Booking" page from the sidebar. Fill in guest details, select a cabin, and choose your dates.',
  },
  {
    q: "How do I check in a guest?",
    a: "Go to the Dashboard and look at Today's Activity. Click the \"Check in\" button next to arriving guests.",
  },
  {
    q: "Can I edit cabin prices?",
    a: "Yes — go to the Cabins page and click the edit icon on any cabin row to update pricing, capacity, or descriptions.",
  },
  {
    q: "How do I change the hotel settings?",
    a: "Navigate to Settings from the sidebar. You can update breakfast price, min/max nights, and max guests per booking.",
  },
  {
    q: "Is the data real-time?",
    a: "Yes — all data is stored in Supabase and synced in real-time with React Query caching for optimal performance.",
  },
];

function HelpCenter() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Help Center</Heading>
      </Row>

      <Grid>
        {RESOURCES.map((r) => (
          <Card
            key={r.title}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconRow>
              <IconBox color={r.color}>{r.icon}</IconBox>
              <ExternalIcon />
            </IconRow>
            <CardTitle>{r.title}</CardTitle>
            <CardDesc>{r.desc}</CardDesc>
          </Card>
        ))}
      </Grid>

      <FAQSection>
        <Heading as="h2">
          <HiOutlineQuestionMarkCircle
            style={{
              display: "inline",
              verticalAlign: "middle",
              marginRight: "0.8rem",
            }}
          />
          Frequently Asked Questions
        </Heading>
        <Divider />
        {FAQS.map((faq) => (
          <FAQItem key={faq.q}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </FAQItem>
        ))}
      </FAQSection>
    </>
  );
}

export default HelpCenter;
