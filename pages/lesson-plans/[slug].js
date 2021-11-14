import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { fetchStrapiApi } from "@/lib/StrapiClient";
import styled from "@emotion/styled";
import Layout from '@/components/Layout';
import Container from '@/components/shared/Container';
import { useEffect, useState } from 'react';
import StyledLink from '@/components/shared/Link/StyledLink'
import { withRouter } from 'next/router'
import PageContainer from '@/components/shared/Container/PageContentWrapper';
import {DefaultText} from '@/components/shared/Paragraph/StyledText';

const StyledPdfContainer = styled.div`
  height: 100%;
`

const StyledObject = styled.object`
  width: 100%;
  height: 800px;
`

const LessonPlan = props => {
  const { lessonPlan, router, hasPdf } = props;
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { asPath, query } = router;

  useEffect(() => {
  
    const previousPageIsSearchPage = globalThis.sessionStorage?.prevPath?.includes('?') || '';
    const BREADCRUMBS_LIST = [
      {
        href: "/",
        title: "Home",
      },
      {
        href: previousPageIsSearchPage ? globalThis.sessionStorage.prevPath : '/lesson-plans',
        title: "Lesson Plans",
        isCurrentPage: false,
      },
      {
        href: asPath,
        title: lessonPlan.title,
        isCurrentPage: true,
      },
    ]
    setBreadcrumbs(BREADCRUMBS_LIST)

  }, [])

  return (
    <Layout
    pageTitle={`${lessonPlan.title} | Project Nota`}
    breadcrumbsList={breadcrumbs}
  >


    <Container>
      <PageContainer title={lessonPlan.title}>
        <section className='m-t-20'>
          <DefaultText>{lessonPlan.description}</DefaultText>

        </section>
        {hasPdf ? (
        <>
          <StyledLink className='m-t-10' href={lessonPlan.link}>Lesson Plan PDF</StyledLink>
          <StyledPdfContainer>
        
            <StyledObject data={lessonPlan.link} type="application/pdf">
              <div>No online PDF viewer installed</div>
              <StyledLink className='m-t-10' href={lessonPlan.link}>Lesson Plan PDF</StyledLink>

            </StyledObject>
        
          </StyledPdfContainer>
        </>

        ) : (
          <StyledLink className='m-t-10' href={lessonPlan.link}>Lesson Plan Link</StyledLink>

        )}
      </PageContainer>
    </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const lessonPlans = await fetchStrapiApi("lesson-plans");

  const paths = lessonPlans.map((lessonPlan) => {
    return {
      params: {
        slug: lessonPlan.id.toString(),
      },
    }
  })
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps = async ({ locale, params }) => {
  try {
    const lessonPlan = await fetchStrapiApi(`lesson-plans/${params.slug}`);

    const hasPdf = lessonPlan.link.toLowerCase().includes('.pdf')

    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
        lessonPlan,
        hasPdf
      }
    }

  } catch (err) {
    return {
      props: {
        ...await serverSideTranslations(locale, ['common', 'nav', 'home']),
        error: true
      }
    }
  }
}

LessonPlan.propTypes = {
  lessonPlan: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    hasPdf: PropTypes.bool,
    router: PropTypes.object
  })
};

export default withRouter(LessonPlan);