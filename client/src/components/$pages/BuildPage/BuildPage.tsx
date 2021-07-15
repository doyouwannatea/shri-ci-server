import React from 'react'
import { toast } from 'react-toastify'
import ANSIConverter from 'ansi-to-html'
import htmlParser from 'html-react-parser'

import Button from '../../$buttons/Button'
import Build from '../../Build/Build'
import Footer from '../../Footer/Footer'
import Header from '../../$header/Header'
import HeaderTitle from '../../$header/HeaderTitle'
import SettingsBtn from '../../$buttons/SettingsBtn'
import Loader from '../../Loader/Loader'

import rebuildIcon from '../../../assets/icons/12_rebuild.svg'
import { useHistory, useParams } from 'react-router-dom'
import { useDismissToasts, useFetchBuild } from '../../../hooks'
import { pushBuild } from '../../../state/actions/builds'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'

import './BuildPage.css'

const converter = new ANSIConverter({ bg: '#F2F2F2', fg: '#000' })

interface BuildPageParams {
    buildId: string
}

const BuildPage = () => {
    useDismissToasts()
    const loading = useAppSelector(state => state.builds.loading)
    const repoName = useAppSelector(state => state.settings.settings.repoName)

    const history = useHistory()
    const dispatch = useAppDispatch()
    const { buildId } = useParams<BuildPageParams>()

    const { build, logs } = useFetchBuild(buildId)

    const onRebuild = async () => {
        if (build) {
            try {
                const buildId = await dispatch(pushBuild(build.commitHash))
                history.push(`/build/${buildId}`)
            } catch (error) {
                toast.error('Error: Other repository')
            }
        }
    }

    return (
        <div className="page">
            <Header title={<HeaderTitle color="#000" title={repoName} />}>
                <Button
                    variant="silent"
                    adaptive
                    action={onRebuild}
                    disabled={!Boolean(build)}
                    icon={rebuildIcon}>Rebuild</Button>
                <SettingsBtn />
            </Header>
            <main className="build-page page__body">
                <Loader loading={loading} />
                {build &&
                    <div className="container">
                        <Build key={build.id} {...build} />
                    </div>}
                <code className="log build-page__log container">
                    <pre className="log__content">
                        {htmlParser(converter.toHtml(logs))}
                    </pre>
                </code>
            </main>
            <Footer />
        </div>
    )
}

export default BuildPage